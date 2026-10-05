"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Icon from "@/components/ui/Icon/Icon";
import ReviewCard from "@/components/ui/ReviewCard/ReviewCard";
import { Feedback } from "@/types/feedback";
import css from "./ReviewsBlock.module.css";

interface ReviewsBlockClientProps {
  feedbacks: Feedback[];
  showLocation: boolean;
}

const ReviewsBlockClient = ({
  feedbacks,
  showLocation,
}: ReviewsBlockClientProps) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1440: { slidesPerView: 3 },
        }}
        navigation={{
          prevEl: `.${css.prevBtn}`,
          nextEl: `.${css.nextBtn}`,
        }}
        pagination={{
          el: `.${css.pagination}`,
          clickable: true,
          dynamicBullets: true,
        }}
        className={css.slider}
      >
        {feedbacks.map((feedback) => (
          <SwiperSlide key={feedback._id} className={css.slide}>
            <ReviewCard feedback={feedback} showLocation={showLocation} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={css.controls}>
        <div className={css.pagination} />

        <div className={css.buttons}>
          <button
            type="button"
            className={`${css.navBtn} ${css.prevBtn}`}
            aria-label="Попередній відгук"
          >
            <Icon name="arrow_back" />
          </button>
          <button
            type="button"
            className={`${css.navBtn} ${css.nextBtn}`}
            aria-label="Наступний відгук"
          >
            <Icon name="arrow_forward" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewsBlockClient;
