"use client";
import Comments from "./Comments";

// This wrapper is required to use Comments (a client component) in server components/pages
export default function PostCommentsClient(props: any) {
  return <Comments {...props} />;
}
