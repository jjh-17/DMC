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
};

const SimpleReviewCard = (review: Review) => {
    
    return(
        <>
        <div>
            {review.image.map((img, index) => (
                <img key={index} src={img} alt={`Review ${review.reviewSeq} Image ${index}`} />
            ))}
        </div>
        <h2>{review.name}</h2>
        <p>{review.content}</p>
        </>
    );
};

export default SimpleReviewCard;