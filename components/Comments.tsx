// Giscus comments integration for TechBlog Pro
"use client";
import React from "react";
import Giscus from "@giscus/react";

const requiredVars = [
  process.env.NEXT_PUBLIC_GISCUS_REPO,
  process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID
];

const Comments = () => {
  if (requiredVars.some((v) => !v)) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-xl mt-12">
        <strong>Giscus comments are not configured correctly.</strong><br />
        Please check your <code>.env.local</code> for all required Giscus variables and restart your dev server.
      </div>
    );
  }
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Comments</h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
        <Giscus
          repo={process.env.NEXT_PUBLIC_GISCUS_REPO! as `${string}/${string}`}
          repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
          category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
          categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
          mapping={(process.env.NEXT_PUBLIC_GISCUS_MAPPING as import("@giscus/react").Mapping) || "pathname"}
          reactionsEnabled={
            process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED === "1"
              ? "1"
              : process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED === "0"
              ? "0"
              : undefined
          }
          emitMetadata={
            process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA === "1"
              ? "1"
              : process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA === "0"
              ? "0"
              : undefined
          }
          inputPosition="bottom"
          theme={process.env.NEXT_PUBLIC_GISCUS_THEME || "preferred_color_scheme"}
          lang="en"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Comments;
