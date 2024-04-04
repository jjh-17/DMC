import { useRef, useState } from "react";
import Button from "../../components/common/Button";
import ReviewRating from "../../components/review/ReviewRating";
import { useDragScroll } from "../../utils/useDragScroll";
import { reviewAPI } from "../../api/reviewAPI";
import useCafeStore from "../../stores/cafeStore";
import { tags } from "../../utils/tag";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PartyPopper from "../../assets/icons/party-popper-joypixels.gif";
import uploadImgUrl from '../../assets/pictures/upload.jpg'

interface Review {
  reviewImages: File[];
  content: string;
  tag: string[];
  rating: number;
}

// TODO : 헤더명 리뷰 작성하기'
export default function ReviewWrite() {
  const selectCafeSeq = useCafeStore((state) => state.selectedCafeSeq);
  const [setRef] = useDragScroll();
  const navigate = useNavigate();

  const handleRef = (node: HTMLElement | null) => {
    if (node) {
      setRef(node);
    }
  };

  const [review, setReview] = useState<Review>({
    reviewImages: [],
    content: "",
    tag: [],
    rating: 0,
  });

  const { reviewImages } = review;

  // 리뷰 별점 관련
  const handleRatingChange = (rating: number) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating: rating,
    }));
  };

  // 리뷰 내용 관련
  const reviewContentRef = useRef<HTMLTextAreaElement>(null);

  const handleBlur = (event: any) => {
    // textarea의 현재 값을 content 상태에 저장
    setReview((prevReview) => ({
      ...prevReview,
      content: event.target.value,
    }));
  };

  // 이미지 관련
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setReview((prevReview) => ({
        ...prevReview,
        reviewImages: [...prevReview.reviewImages, file],
      }));
    }
  };

  // 태그 관련
  // 영어 변환 작업 해야함
  const tagKeys = tags.map((tag) => Object.keys(tag)[0]);

  const selectedTags = useRef<string[]>([]);

  const handleSelectTags = (key: string) => {
    if (!selectedTags.current.includes(key)) {
      selectedTags.current.push(key);
    } else {
      selectedTags.current = selectedTags.current.filter((tag) => tag !== key);
    }

    // 한글 태그 영어로 변환
    const mappedTag = selectedTags.current.map((koreanTag) => {
      const tagObject = tags.find((tag) => Object.keys(tag)[0] === koreanTag);
      return tagObject ? String(tagObject[koreanTag]) : "";
    });

    setReview((prevReview) => ({
      ...prevReview,
      tag: mappedTag,
    }));
  };

  // 리뷰 작성
  const writeReviewData = async () => {
    // 폼데이타 변환
    const formData = new FormData();
    review.reviewImages.forEach((image, index) => {
      formData.append(`reviewImages[${index}]`, image);
    });
    formData.append("content", review.content);
    formData.append("rating", review.rating.toString());
    review.tag.forEach((tag, index) => {
      formData.append(`tag[${index}]`, tag);
    });

    try {
      const response = await reviewAPI.writeReview(selectCafeSeq, formData);
      if (response.data.result && response.data.result.length > 0) {
        const messageTitle = response.data.result[0];
        Swal.fire({
          title: "축하합니다!",
          imageUrl: `${PartyPopper}`,
          imageWidth: 400,
          imageHeight: 300,
          text: `${messageTitle} 획득!`,
        }).then(() => navigate("/cafeDetail/review"));
      } else if (response.data.success) {
        Swal.fire({
          title: "리뷰가 등록되었습니다!",
          icon: "success",
        }).then(() => navigate("/cafeDetail/review"));
      } else {
        Swal.fire({
          title: "리뷰 등록 실패!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("리뷰 작성 에러: ", error);
    }
    // console.log("업로드", review); // 백 연결 후 review 출력해보기
  };

  const labelClass = "lg:text-2xl";

  return (
    <div className="min-w-screen max-w-[600px] flex flex-col gap-4 border-t-2 border-primary2 mx-auto p-6">
      <label className="text-center text-2xl lg:text-3xl">별점 등록하기</label>
      <ReviewRating onRatingChange={handleRatingChange} />
      <div className="p-4 m-4 flex flex-col items-center">
        <div className="w-[25lvh] h-[25lvh] text-center padding-1 relative cursor-pointer border-2 border-dashed mb-5 mx-auto">
          <img src={UploadIconUrl} alt="upload" />
          <h3>사진을 업로드하세요</h3>
          <input
            id="uploadInput"
            type="file"
            className="w-[25lvh] h-[25lvh] cursor-pointer opacity-0 absolute inset-0 z-10"
            onChange={handleImageChange}
          />
        </div>
        <label className={labelClass}>등록한 사진</label>
        <div
          ref={handleRef}
          className="flex rounded-lg overflow-x-auto my-5 no-scroll w-full h-[28lvh] border-2 border-primary bg-slate-100"
        >
          {reviewImages.map((imageFile, index) => (
            <img
              key={index}
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded"
              className="w-[25lvh] h-[25lvh] object-cover m-2 border-[1px] border-slate-400 p-2"
              onLoad={() => URL.revokeObjectURL(URL.createObjectURL(imageFile))}
            />
          ))}
        </div>
        <label className={labelClass}>리뷰 작성하기</label>
        <textarea
          className="my-5 w-full h-48 outline-none border-2 border-primary focus:border-2 rounded-lg p-5 bg-slate-100"
          ref={reviewContentRef}
          placeholder="리뷰를 작성하세요"
          onBlur={handleBlur}
        />
        <label className={labelClass}>태그 추가</label>
        <div className="my-5 flex flex-wrap whitespace-pre-wrap basis-- -m-1">
          {tagKeys.map((key, index) => (
            <div key={index} className="flex-auto w-1/7 p-1">
              <motion.div
                onClick={() => handleSelectTags(key)}
                whileHover={
                  !selectedTags.current.includes(key) ? { scale: 1.1 } : {}
                }
                transition={{ delay: 0.1, duration: 0.1 }}
                className={`text-center border-2 border-primary2 p-[7px] rounded-lg cursor-pointer ${
                  selectedTags.current.includes(key)
                    ? "bg-primary text-white hover:bg-primary"
                    : "hover:bg-gray-200"
                }`}
              >
                {key}
              </motion.div>
            </div>
          ))}
        </div>

        <Button
          label="작성하기"
          onClick={writeReviewData}
          addClass="mx-auto"
        ></Button>
      </div>
    </div>
  );
}
