"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BELONG_OTHER_ID } from "@/constants/belongs";
import { JOB_OTHER_ID } from "@/constants/jobs";
import { PREFECTURE_OTHER_ID } from "@/constants/prefectures";
import { Belong, Job, Prefecture, User } from "@/types";

const userFormSchema = z.object({
  id: z.number().min(1, { message: "IDを入力してください" }),
  name: z.string().min(1, { message: "氏名を入力してください" }),
  pronunciation: z.string().min(1, { message: "ふりがなを入力してください" }),
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  phone: z
    .string()
    .min(1, { message: "電話番号を入力してください" })
    .regex(/^[0-9-]+$/, { message: "有効な電話番号を入力してください" }),
  nonJapanese: z.boolean().optional(),
  prefectureId: z
    .string()
    .min(1, { message: "都道府県を選択してください" })
    .regex(/^[0-9]+$/, { message: "都道府県を入力してください" }),
  prefectureOther: z.string().nullable().optional(),
  city: z.string().min(1, { message: "市区町村を入力してください" }).optional(),
  address: z.string().min(1, { message: "住所を入力してください" }).optional(),
  building: z.string().nullable().optional(),
  belongId: z
    .string()
    .min(1, { message: "所属を選択してください" })
    .regex(/^[0-9]+$/, { message: "所属を入力してください" }),
  belongOther: z.string().nullable().optional(),
  belongDetail: z.string().nullable().optional(),
  jobId: z
    .string()
    .min(1, { message: "職業を選択してください" })
    .regex(/^[0-9]+$/, { message: "職業を入力してください" }),
  jobOther: z.string().nullable().optional(),
  comments: z.string().nullable().optional(),
  warnings: z.string().nullable().optional(),
});

export type UserFormData = z.infer<typeof userFormSchema>;

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: UserFormData) => void;
  onDelete: (userId: number) => void;
  initialValues?: Partial<User>;
  prefectures: Prefecture[];
  belongs: Belong[];
  jobs: Job[];
}

export const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialValues,
  prefectures,
  belongs,
  jobs,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      id: initialValues?.id,
      name: initialValues?.name,
      pronunciation: initialValues?.pronunciation,
      email: initialValues?.email,
      phone: initialValues?.phone,
      nonJapanese: initialValues?.nonJapanese,
      prefectureId: initialValues?.prefectureId?.toString(),
      prefectureOther: initialValues?.prefectureOther,
      city: initialValues?.city,
      address: initialValues?.address,
      building: initialValues?.building,
      belongId: initialValues?.belongId?.toString(),
      belongOther: initialValues?.belongOther,
      belongDetail: initialValues?.belongDetail,
      jobId: initialValues?.jobId?.toString(),
      jobOther: initialValues?.jobOther,
      comments: initialValues?.comments,
      warnings: initialValues?.warnings,
    },
  });

  const submit = (data: UserFormData) => {
    onSave(data);
    reset();
    onClose();
  };

  const handleDelete = () => {
    if (initialValues?.id) {
      const confirmed = confirm("本当に削除しますか？");
      if (!confirmed) {
        return;
      }
      onDelete(initialValues?.id);
      reset();
      onClose();
    }
  };

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-2xl">
        <h3 className="mb-6 text-center text-lg font-bold">ユーザー情報編集</h3>
        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ID</span>
            </label>
            <input
              className={`input input-bordered w-full`}
              placeholder="1"
              type="text"
              disabled
              {...register("id")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">氏名</span>
              </label>
              <input
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="山田太郎"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.name.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">氏名(ふりがな)</span>
              </label>
              <input
                className={`input input-bordered w-full ${
                  errors.pronunciation ? "input-error" : ""
                }`}
                placeholder="福岡"
                type="text"
                {...register("pronunciation")}
              />
              {errors.pronunciation && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.pronunciation.message}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">メールアドレス</span>
              </label>
              <input
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="example@example.com"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">電話番号</span>
              </label>
              <input
                className={`input input-bordered w-full ${
                  errors.phone ? "input-error" : ""
                }`}
                placeholder="090-1234-5678"
                type="tel"
                {...register("phone")}
              />
              {errors.phone && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.phone.message}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <input
                className="checkbox"
                type="checkbox"
                {...register("nonJapanese")}
              />
              <label className="label">
                <span className="label-text ml-2">外国人</span>
              </label>

              {errors.nonJapanese && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.nonJapanese.message}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">都道府県</span>
              </label>
              <select
                className={`select select-bordered w-full ${
                  errors.prefectureId ? "input-error" : ""
                }`}
                {...register("prefectureId")}
              >
                {prefectures.map((prefecture) => (
                  <option
                    key={prefecture.prefectureId}
                    value={prefecture.prefectureId}
                  >
                    {prefecture.name}
                  </option>
                ))}
              </select>
              {errors.prefectureId && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.prefectureId.message}
                  </span>
                </label>
              )}
              {watch("prefectureId") === String(PREFECTURE_OTHER_ID) && (
                <input
                  className={`input input-bordered w-full ${
                    errors.prefectureOther ? "input-error" : ""
                  }`}
                  placeholder="その他詳細"
                  {...register("prefectureOther")}
                />
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">市区町村</span>
              </label>
              <input
                className={`input input-bordered w-full ${
                  errors.city ? "input-error" : ""
                }`}
                placeholder="福岡市"
                type="text"
                {...register("city")}
              />
              {errors.city && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.city.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">住所</span>
              </label>
              <input
                className={`input input-bordered w-full ${
                  errors.address ? "input-error" : ""
                }`}
                placeholder="福岡市"
                type="text"
                {...register("address")}
              />
              {errors.address && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.address.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">建物名</span>
              </label>
              <input
                className={`input input-bordered w-full ${
                  errors.building ? "input-error" : ""
                }`}
                placeholder="ビル"
                type="text"
                {...register("building")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">所属</span>
              </label>
              <select
                className={`select select-bordered w-full ${
                  errors.belongId ? "input-error" : ""
                }`}
                {...register("belongId")}
              >
                {belongs.map((belong) => (
                  <option key={belong.belongId} value={belong.belongId}>
                    {belong.name}
                  </option>
                ))}
              </select>
              {errors.belongId && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.belongId.message}
                  </span>
                </label>
              )}
              {watch("belongId") === String(BELONG_OTHER_ID) && (
                <input
                  className={`input input-bordered w-full ${
                    errors.belongOther ? "input-error" : ""
                  }`}
                  placeholder="その他詳細"
                  {...register("belongOther")}
                />
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">所属詳細</span>
              </label>
              <input
                className={`input input-bordered w-full ${
                  errors.belongDetail ? "input-error" : ""
                }`}
                placeholder="所属詳細"
                {...register("belongDetail")}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">職業</span>
            </label>
            <select
              className={`select select-bordered w-full ${
                errors.jobId ? "input-error" : ""
              }`}
              {...register("jobId")}
            >
              {jobs.map((job) => (
                <option key={job.jobId} value={job.jobId}>
                  {job.name}
                </option>
              ))}
            </select>
            {errors.jobId && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.jobId.message}
                </span>
              </label>
            )}
            {watch("jobId") === String(JOB_OTHER_ID) && (
              <div className="form-control">
                <input
                  className={`input input-bordered w-full ${
                    errors.jobOther ? "input-error" : ""
                  }`}
                  placeholder="その他詳細"
                  {...register("jobOther")}
                />
              </div>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">コメント</span>
            </label>
            <textarea
              className={`textarea textarea-bordered w-full ${
                errors.comments ? "textarea-error" : ""
              }`}
              {...register("comments")}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">警告</span>
            </label>
            <textarea
              className={`textarea textarea-bordered w-full ${
                errors.warnings ? "textarea-error" : ""
              }`}
              {...register("warnings")}
            />
          </div>

          <div className="modal-action justify-between">
            <div>
              <button
                className="btn btn-error text-white"
                type="button"
                onClick={handleDelete}
              >
                削除
              </button>
            </div>
            <div className="flex gap-4">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                閉じる
              </button>
              <button className="btn btn-primary" type="submit">
                保存
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </dialog>
  );
};

export default UserEditModal;
