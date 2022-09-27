import React from "react";

export default function Pagination({
  currentPage, //Page hiện tại mình đang xem
  pageSize, //Số phần tử trong 1 page, cái này FE sẽ tự quyết định
  totalCount, //Tổng số phần tử, cái này BE trả về
}) {
  const generatePage = () => {
    // Là sô lượng trang trước và sau trang hiện tại được thể hiện trên UI
    // Ví dụ currentPage là 4 thì mình sẽ hiện page ra UI là 2-3-4-5-6,
    //số 2 tương đương currentPage - delta, số 6 tương đương currentPage + delta
    const delta = 2;

    // TotalPage là tổng số page mình có, được tính theo công thức totalCount/pageSize
    // totalCount là BE cung cấp khi gọi API
    // pageSize là số lương mỗi phần tử được hiển thị trong 1 page, FE có thể tự quyết định
    // Math.ceil là làm tròn lên, ví dụ 2.5 làm tròn lên 3

    const totalPage = Math.ceil(totalCount / pageSize);
  };

  return <div>pagination</div>;
}
