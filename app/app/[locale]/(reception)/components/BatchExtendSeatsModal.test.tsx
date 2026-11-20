import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { Seat, SeatUsage } from "@/types";
import { BatchExtendSeatsModal } from "./BatchExtendSeatsModal";

const seats: Seat[] = [1, 2].map((id) => ({
  id,
  name: `座席${id}`,
  order: id,
  categoryId: 1,
  outOfService: false,
  attentionMessage: "",
  usageDurationMinutes: 120,
}));

const usages: SeatUsage[] = seats.map((seat) => ({
  id: seat.id + 10,
  seatId: seat.id,
  userId: seat.id + 200,
  startTime: "2026-11-20T00:00:00Z",
  endTime: null,
  remark: "",
  usageDurationMinutes: 120,
}));

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date("2026-11-20T02:30:00Z"));
  // jsdom does not implement the native dialog methods.
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});

afterEach(() => jest.useRealTimers());

function renderPanel(
  seatUsages = usages,
  onFinishSeatUsage = jest.fn().mockResolvedValue(undefined),
) {
  const props = {
    seats,
    seatUsages,
    onFinishSeatUsage,
    onClose: jest.fn(),
    onExecute: jest.fn(),
  };
  const { rerender } = render(<BatchExtendSeatsModal {...props} />);
  return {
    ...props,
    refreshSeatUsages: (next: SeatUsage[]) =>
      rerender(<BatchExtendSeatsModal {...props} seatUsages={next} />),
  };
}

function checkoutButton(seatName: string) {
  return screen.getByRole("button", { name: `${seatName}を退席` });
}

it("checks out only the clicked usage and preserves the remaining selection after refresh", async () => {
  const { onExecute, onFinishSeatUsage, refreshSeatUsages } = renderPanel();
  fireEvent.click(
    screen.getByRole("checkbox", { name: "座席1を延長対象にする" }),
  );
  fireEvent.click(
    screen.getByRole("checkbox", { name: "座席2を延長対象にする" }),
  );

  fireEvent.click(checkoutButton("座席1"));
  const confirm = screen.getByRole("dialog", { name: "退席確認" });
  expect(within(confirm).getByText("座席1")).toBeVisible();
  expect(within(confirm).getByText("201")).toBeVisible();
  expect(onFinishSeatUsage).not.toHaveBeenCalled();

  await act(async () => {
    fireEvent.click(within(confirm).getByRole("button", { name: "はい" }));
    refreshSeatUsages([{ ...usages[1] }]);
  });

  expect(onFinishSeatUsage).toHaveBeenCalledTimes(1);
  expect(onFinishSeatUsage).toHaveBeenCalledWith(usages[0]);
  expect(screen.queryByRole("button", { name: "座席1を退席" })).toBeNull();
  const remaining = screen.getByRole("checkbox", {
    name: "座席2を延長対象にする",
  });
  expect(remaining).not.toBeChecked();
  fireEvent.click(remaining);
  fireEvent.click(screen.getByRole("button", { name: "実行する" }));
  expect(onExecute).toHaveBeenCalledWith([usages[1]]);
});

it("returns to the same row on cancellation without triggering batch extension", () => {
  const { onClose, onExecute, onFinishSeatUsage } = renderPanel();
  let button = checkoutButton("座席1");
  button.focus();
  fireEvent.keyDown(button, { key: "Enter" });
  expect(onExecute).not.toHaveBeenCalled();
  // jsdom does not dispatch a native click for the preceding keydown.
  fireEvent.click(button);
  const cancel = screen.getByRole("button", { name: "いいえ" });
  expect(cancel).toHaveFocus();
  fireEvent.keyDown(cancel, { key: "Escape" });

  button = checkoutButton("座席1");
  expect(button).toHaveFocus();
  expect(
    screen
      .getAllByRole("checkbox")
      .every((checkbox) => (checkbox as HTMLInputElement).checked),
  ).toBe(true);
  fireEvent.click(button);
  fireEvent.click(screen.getByRole("button", { name: "いいえ" }));

  expect(checkoutButton("座席1")).toHaveFocus();
  expect(onFinishSeatUsage).not.toHaveBeenCalled();
  expect(onClose).not.toHaveBeenCalled();
});

it("prevents duplicate submissions and keeps the empty panel open after the last checkout", async () => {
  let finish!: () => void;
  const pending = new Promise<void>((resolve) => {
    finish = resolve;
  });
  const { onClose, onExecute, onFinishSeatUsage, refreshSeatUsages } =
    renderPanel(
      [usages[0]],
      jest.fn(() => pending),
    );
  fireEvent.click(checkoutButton("座席1"));
  const confirm = screen.getByRole("button", { name: "はい" });

  act(() => {
    fireEvent.keyDown(confirm, { key: "Enter" });
    fireEvent.click(confirm);
    fireEvent.click(confirm);
  });

  expect(onFinishSeatUsage).toHaveBeenCalledTimes(1);
  expect(confirm).toBeDisabled();
  expect(screen.getByRole("button", { name: "いいえ" })).toBeDisabled();
  fireEvent.keyDown(confirm, { key: "Escape" });
  expect(onClose).not.toHaveBeenCalled();
  expect(onExecute).not.toHaveBeenCalled();

  await act(async () => {
    refreshSeatUsages([]);
    finish();
  });

  expect(screen.getByText("利用中の座席はありません")).toBeVisible();
  expect(screen.getByRole("button", { name: "実行する" })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: "キャンセル" }));
  expect(onClose).toHaveBeenCalledTimes(1);
});

it("does not check out a replacement usage on the same seat", async () => {
  const { onFinishSeatUsage, refreshSeatUsages } = renderPanel([usages[0]]);
  fireEvent.click(checkoutButton("座席1"));
  refreshSeatUsages([{ ...usages[0], id: 20 }]);

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "はい" }));
  });

  expect(onFinishSeatUsage).not.toHaveBeenCalled();
  expect(checkoutButton("座席1")).toBeVisible();
});

it("explains why a usage cannot be checked out before it starts", () => {
  const { onFinishSeatUsage } = renderPanel([
    { ...usages[0], startTime: "2026-11-20T03:00:00Z" },
  ]);
  fireEvent.click(checkoutButton("座席1"));
  fireEvent.click(screen.getByRole("button", { name: "はい" }));
  expect(screen.getByRole("alert")).toHaveTextContent(
    "利用開始前のため退席できません。",
  );
  expect(onFinishSeatUsage).not.toHaveBeenCalled();
});

it("keeps the confirmation open if the stored usage cannot be checked out", async () => {
  renderPanel(
    [usages[0]],
    jest.fn().mockResolvedValue("利用開始前のため退席できません。"),
  );
  fireEvent.click(checkoutButton("座席1"));

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "はい" }));
  });

  expect(screen.getByRole("alert")).toHaveTextContent(
    "利用開始前のため退席できません。",
  );
  fireEvent.click(screen.getByRole("button", { name: "いいえ" }));
  expect(checkoutButton("座席1")).toHaveFocus();
});
