import DetailReviewCard from "../../components/review/DetailReviewCard";

export default function CafeReview() {
  

  return (
    <>
    <DetailReviewCard/>
    <p>데이터 들어오면 주석 처리한 리스트 로직으로 변경</p>
    </>

    // <div className="w-fit mx-auto">
    //   <div className="flex flex-col">
    //     {cafeReviewData.map((review) => (
    //       <div key={cafe.cafeSeq}>
    //         <DetailReviewCard {...review} />
    //       </div>
    //     ))}
    //   </div>
    // </div>
  )
}
