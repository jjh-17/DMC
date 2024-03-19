import ThumbUp from '../../assets/icons/thumbup.svg?react'

interface Review {
  reviewSeq: number;
  memberSeq: number;
  cafeSeq: number;
  name: string;
  image: string[];
  content: string;
  tag: string[];
  rating: number;
  createdDate: string;
}

const SimpleReviewCard = (review: Review) => {
  return (
    <div className="min-w-screen max-w-[600px] flex flex-col gap-4 border-b-[1px] border-slate-500 mx-auto p-6">
      <div className="flex justify-between items-center p-2">
        <h2 className="text-3xl">{review.name}</h2>
        <p className="mr-0 font-light text-slate-600">{review.createdDate}</p>
      </div>
      {/* 이미지 리스트 */}
      {review.image.length > 0 && (
        <div className="flex overflow-x-auto my-2 no-scroll px-3 py-4 w-full">
          {review.image.map((img, index) => (
            <img key={index} src={img} alt={`Review ${review.reviewSeq} Image ${index}`}
              className="w-32 h-32 mr-2 object-cover" />
          ))}
        </div>
      )}
      <div className='p-4'>
        <p className='whitespace-pre-wrap mb-2'>
          {review.content}
        </p>
        {review.tag.map((tag, index) => (
          <span className="text-sm font-light text-primary mx-1" key={index}>
            #{tag}{" "}
          </span>
        ))}
      </div>
      <div className="flex justify-between py-2">
        <button onClick={() => console.log('좋아요')}>
          <ThumbUp id="svgIcon" className='mr-2' />
          <span className='font-semibold text-slate-500'>50</span>
        </button>
        <div className=' text-slate-500'>
          <button className="hover:text-blue-700 mx-2">수정</button>
          <button className='hover:text-red-700'>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default SimpleReviewCard;