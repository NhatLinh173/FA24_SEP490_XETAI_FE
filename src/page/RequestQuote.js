import React from "react";
import CommonBanner from "../component/Common/Banner";
import RequestQuoteForm from "../component/Common/RequestQuoteForm";

const RequestQuote = () => {
  return (
    <>
      <CommonBanner heading="Tạo đơn hàng" />
      <RequestQuoteForm />
    </>
  );
};

export default RequestQuote;
