import { fireEvent, render, screen } from "@testing-library/react";
import { Seat, SeatUsage } from "@/types";
import SeatCard from "./SeatCard";

const seat: Seat = {
  id: 1,
  name: "メインホール:A1",
  outOfService: false,
  attentionMessage: "座席の注意事項",
  order: 1,
  categoryId: 1,
  usageDurationMinutes: 120,
};

const seatUsage: SeatUsage = {
  id: 10,
  seatId: seat.id,
  userId: 123456,
  startTime: "2026-11-20T00:00:00Z",
  usageDurationMinutes: 120,
  remark: "",
};

function renderSeatCard(usage: SeatUsage | null) {
  render(<SeatCard seat={seat} seatUsage={usage} onSeatClick={jest.fn()} />);
}

it.each([
  ["一行目\n二行目", "警告本文"],
  ["コメント本文", null],
  ["　\t\n", "警告本文"],
  [null, ""],
])(
  "会員番号の横に記載のあるマークだけを表示する (%j, %j)",
  (comments, warnings) => {
    renderSeatCard({
      ...seatUsage,
      user: { id: seatUsage.userId, name: "テスト会員", comments, warnings },
    });

    const memberNumber = screen.getByText(String(seatUsage.userId));
    const commentMark = screen.queryByRole("img", { name: "コメントあり" });
    const warningMark = screen.queryByRole("img", { name: "警告あり" });

    if (comments?.trim()) {
      expect(memberNumber.parentElement).toContainElement(commentMark);
    } else {
      expect(commentMark).not.toBeInTheDocument();
    }

    if (warnings?.trim()) {
      expect(memberNumber.parentElement).toContainElement(warningMark);
    } else {
      expect(warningMark).not.toBeInTheDocument();
    }
  },
);

it("ホバーしたマークの本文を吹き出しで表示し、マウスが離れたら閉じる", () => {
  const comments = "一行目\n二行目";
  const warnings = "警告本文";
  renderSeatCard({
    ...seatUsage,
    user: { id: seatUsage.userId, name: "テスト会員", comments, warnings },
  });

  expect(screen.queryByRole("tooltip")).toBeNull();

  const commentMark = screen.getByRole("img", { name: "コメントあり" });
  fireEvent.mouseEnter(commentMark);
  expect(screen.getByRole("tooltip").textContent).toBe(comments);
  fireEvent.mouseLeave(commentMark);
  expect(screen.queryByRole("tooltip")).toBeNull();

  const warningMark = screen.getByRole("img", { name: "警告あり" });
  fireEvent.mouseEnter(warningMark);
  expect(screen.getByRole("tooltip")).toHaveTextContent(warnings);
  fireEvent.mouseLeave(warningMark);
  expect(screen.queryByRole("tooltip")).toBeNull();
});

it.each([null, { ...seatUsage, user: null }])(
  "空席または会員情報を取得できない場合にマークを表示しない (%j)",
  (usage) => {
    renderSeatCard(usage);

    expect(screen.queryByRole("img", { name: "コメントあり" })).toBeNull();
    expect(screen.queryByRole("img", { name: "警告あり" })).toBeNull();
  },
);
