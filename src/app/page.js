"use client";

import FormRow from "@/components/FormRow";
import { useForm } from "react-hook-form";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

import { CopyToClipboard } from "react-copy-to-clipboard";
import ErrorMessage from "@/components/ErrorMessage";
import moment from "moment";
import { useState } from "react";
import slugify from "slugify";
import { Poppins } from "@next/font/google";
import clsx from "clsx";

const bodyFont = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

const authors = {
  hn: "Huy Nguyen, Software Engineer",
  tr: "Tien Tran, Team Lead",
};

function generateMardown({ title, excerpt, imageUrl, author }) {
  return `---
title: ${title}
slug: ${slugify(title, { lower: true })}
excerpt: ${excerpt}
imageUrl: ${imageUrl}
author: ${authors[author]}
publishOn: ${moment().unix()}
---`;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [result, setResult] = useState("");
  const [copy, setCopy] = useState(false);

  const onSubmit = (data) => {
    setResult(generateMardown(data));
  };

  const onReset = () => {
    reset();
    setResult("");
    setCopy(false);
  };

  return (
    <main className={clsx("min-h-screen py-10", bodyFont.className)}>
      {/* Heading */}
      <div className="h-full max-w-screen-xl px-4 mx-auto md:px-6">
        <h1 className="mb-10 text-2xl font-bold text-center md:text-3xl">
          Markdown Fronmatter Generator
        </h1>
      </div>

      <div className="h-full max-w-screen-xl px-4 mx-auto md:px-6">
        <div className="grid gap-8 auto-rows-fr lg:grid-cols-2">
          {/* Fronmatter form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <FormRow label={"Title"}>
                  <input
                    type="text"
                    placeholder="Main title"
                    className="w-full input input-bordered"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <ErrorMessage message={"Title is required"} />
                  )}
                </FormRow>
                <FormRow label={"Excerpt"}>
                  <textarea
                    className="h-40 resize-none textarea textarea-bordered"
                    placeholder="Write something here..."
                    {...register("excerpt", { required: true })}
                  ></textarea>
                  {errors.excerpt && (
                    <ErrorMessage message={"Excerpt is required"} />
                  )}
                </FormRow>
                <FormRow label={"Image"}>
                  <input
                    type="text"
                    placeholder="Unsplash URL..."
                    className="w-full input input-bordered"
                    {...register("imageUrl", { required: true })}
                  />
                  <label className="label">
                    <a
                      href="https://unsplash.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="capitalize btn btn-link btn-xs label-text-alt"
                    >
                      Go to Unsplash
                    </a>
                  </label>
                  {errors.imageUrl && (
                    <ErrorMessage message={"Image is required"} />
                  )}
                </FormRow>
                <FormRow label={"Author"}>
                  <select
                    className="w-full select select-bordered"
                    defaultValue={authors.hn}
                    {...register("author", { required: true })}
                  >
                    {Object.entries(authors).map((author) => (
                      <option key={author[0]} value={author[0]}>
                        {author[1]}
                      </option>
                    ))}
                  </select>
                </FormRow>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <button type="submit" className="w-full btn btn-primary">
                  Generate Fromatter
                </button>
                <button
                  type="button"
                  onClick={onReset}
                  className="w-full btn btn-accent"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Result */}
          <div>
            <FormRow label={"Result"}>
              <div className="relative w-full h-full">
                <CopyToClipboard
                  text={result}
                  onCopy={() => setCopy(true)}
                  data-tip={copy ? "Copied" : "Copy"}
                >
                  <button className="absolute top-2 right-2 tooltip btn btn-ghost">
                    <ClipboardDocumentIcon className="w-6 h-6" />
                  </button>
                </CopyToClipboard>
                <textarea
                  className="w-full h-full py-4 resize-none textarea textarea-bordered bg-slate-100"
                  placeholder="Markdown will be generated here..."
                  readOnly
                  value={result}
                ></textarea>
              </div>
            </FormRow>
          </div>
        </div>
      </div>
    </main>
  );
}
