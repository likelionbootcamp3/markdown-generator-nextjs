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
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 h-full">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Markdown Fronmatter Generator
        </h1>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 h-full">
        <div className="grid auto-rows-fr lg:grid-cols-2 gap-8">
          {/* Fronmatter form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <FormRow label={"Title"}>
                  <input
                    type="text"
                    placeholder="Main title"
                    className="input input-bordered w-full"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <ErrorMessage message={"Title is required"} />
                  )}
                </FormRow>
                <FormRow label={"Excerpt"}>
                  <textarea
                    className="textarea textarea-bordered resize-none h-40"
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
                    className="input input-bordered w-full"
                    {...register("imageUrl", { required: true })}
                  />
                  {errors.imageUrl && (
                    <ErrorMessage message={"Image is required"} />
                  )}
                </FormRow>
                <FormRow label={"Author"}>
                  <select
                    className="select select-bordered w-full"
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
                <button type="submit" className="btn btn-primary w-full">
                  Generate Fromatter
                </button>
                <button
                  type="button"
                  onClick={onReset}
                  className="btn btn-accent w-full"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Result */}
          <div>
            <FormRow label={"Result"}>
              <div className="relative h-full w-full">
                <CopyToClipboard
                  text={result}
                  onCopy={() => setCopy(true)}
                  data-tip={copy ? "Copied" : "Copy"}
                >
                  <button className="absolute top-2 right-2 tooltip btn btn-ghost">
                    <ClipboardDocumentIcon className="h-6 w-6" />
                  </button>
                </CopyToClipboard>
                <textarea
                  className="textarea textarea-bordered resize-none w-full h-full bg-slate-100 py-4"
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
