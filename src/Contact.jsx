import React from "react";
import PageWrapper from "./PageWrapper";

export default function Contact() {
  return (
    <PageWrapper title="Contact Us">
      <p className="text-white">
        If you have any questions or feedback, feel free to reach out.
      </p>
      <p className="mt-2 text-white">
        <strong>Email:</strong> yourname@gmail.com
      </p>
    </PageWrapper>
  );
}
