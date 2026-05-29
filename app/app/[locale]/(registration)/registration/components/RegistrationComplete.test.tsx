import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useTranslations } from "next-intl";
import RegistrationComplete from "./RegistrationComplete";

jest.mock("next-intl");

const mockUseTranslations = jest.mocked(useTranslations);

const translations: Record<string, string> = {
  title: "ユーザー登録完了",
  userId: "会員番号",
  alertTitle: "会員番号を保存してください",
  alertMessage:
    "この番号はNFCカード登録や受付時に必要です。スクリーンショットを撮るか、下のボタンから画像として保存してください。",
  saveImage: "画像を保存",
  savingImage: "画像を作成中",
  saveError:
    "画像を保存できませんでした。画面のスクリーンショットを撮って保存してください。",
  shareTitle: "Engineer Cafe 会員番号",
  shareText: "Engineer Cafe の会員番号です。",
  imageTitle: "Engineer Cafe",
  imageNote: "NFCカード登録・受付時に必要です",
};

const mockCanvasContext = {
  arc: jest.fn(),
  beginPath: jest.fn(),
  clearRect: jest.fn(),
  clip: jest.fn(),
  closePath: jest.fn(),
  createLinearGradient: jest.fn(() => ({
    addColorStop: jest.fn(),
  })),
  fill: jest.fn(),
  fillRect: jest.fn(),
  fillText: jest.fn(),
  lineTo: jest.fn(),
  measureText: jest.fn((text: string) => ({ width: text.length * 24 })),
  moveTo: jest.fn(),
  restore: jest.fn(),
  save: jest.fn(),
  stroke: jest.fn(),
};

function mockCanvas(
  blob: Blob | null = new Blob(["image"], { type: "image/png" }),
) {
  jest
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(mockCanvasContext as unknown as CanvasRenderingContext2D);
  jest
    .spyOn(HTMLCanvasElement.prototype, "toBlob")
    .mockImplementation((callback) => {
      callback(blob);
    });
}

function mockNavigatorShare(canShare: boolean) {
  Object.defineProperty(navigator, "canShare", {
    configurable: true,
    value: jest.fn(() => canShare),
  });
  Object.defineProperty(navigator, "share", {
    configurable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });
}

describe("RegistrationComplete", () => {
  const createObjectURL = jest.fn(() => "blob:member-number");
  const revokeObjectURL = jest.fn();
  const anchorClick = jest.fn();

  beforeEach(() => {
    mockUseTranslations.mockReturnValue(
      ((key: string) => translations[key] || key) as ReturnType<
        typeof useTranslations
      >,
    );
    mockCanvas();
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: createObjectURL,
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: revokeObjectURL,
    });
    jest
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(anchorClick);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("会員番号、保存案内、保存ボタンを表示する", () => {
    render(<RegistrationComplete createdUserId={12345} />);

    expect(screen.getByText("ユーザー登録完了")).toBeInTheDocument();
    expect(screen.getByText("会員番号")).toBeInTheDocument();
    expect(screen.getByText("012345")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "会員番号: 012345" }),
    ).toBeInTheDocument();
    expect(screen.getByText("会員番号を保存してください")).toBeInTheDocument();
    expect(
      screen.getByText(
        "この番号はNFCカード登録や受付時に必要です。スクリーンショットを撮るか、下のボタンから画像として保存してください。",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "画像を保存" }),
    ).toBeInTheDocument();
    expect(mockCanvasContext.fillText).toHaveBeenCalledWith(
      "Engineer Cafe",
      expect.any(Number),
      expect.any(Number),
    );
    expect(mockCanvasContext.fillText).toHaveBeenCalledWith(
      "012345",
      expect.any(Number),
      expect.any(Number),
    );
  });

  it("共有可能な端末では会員番号画像を共有する", async () => {
    mockNavigatorShare(true);
    render(<RegistrationComplete createdUserId={12345} />);

    fireEvent.click(screen.getByRole("button", { name: "画像を保存" }));

    await waitFor(() => {
      expect(navigator.share).toHaveBeenCalledWith(
        expect.objectContaining({
          files: [expect.any(File)],
          title: "Engineer Cafe 会員番号",
          text: "Engineer Cafe の会員番号です。",
        }),
      );
    });
    expect(navigator.canShare).toHaveBeenCalledWith({
      files: [expect.any(File)],
    });
  });

  it("共有できない端末では会員番号画像をダウンロードする", async () => {
    mockNavigatorShare(false);
    render(<RegistrationComplete createdUserId={12345} />);

    fireEvent.click(screen.getByRole("button", { name: "画像を保存" }));

    await waitFor(() => {
      expect(anchorClick).toHaveBeenCalledTimes(1);
    });
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
  });

  it("画像生成に失敗した場合はスクリーンショット保存を案内する", async () => {
    mockNavigatorShare(true);
    mockCanvas(null);
    render(<RegistrationComplete createdUserId={12345} />);

    fireEvent.click(screen.getByRole("button", { name: "画像を保存" }));

    expect(
      await screen.findByText(
        "画像を保存できませんでした。画面のスクリーンショットを撮って保存してください。",
      ),
    ).toBeInTheDocument();
  });
});
