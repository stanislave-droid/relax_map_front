"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Icon from "@/components/ui/Icon/Icon";
import RatingStars from "@/components/ui/RatingStars/RatingStars";
import { Feedback } from "@/types/feedback";
import css from "./ReviewsBlock.module.css";

interface ReviewsBlockClientProps {
  feedbacks: Feedback[];
}

const ReviewsBlockClient = ({ feedbacks }: ReviewsBlockClientProps) => {
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
        {feedbacks.map(({ _id, rate, description, userName, locationId }) => (
          <SwiperSlide key={_id} className={css.slide}>
            <article className={css.card}>
              <RatingStars value={rate} />
              <p className={css.text}>{description}</p>
              <div className={css.authorInfo}>
                <p className={css.author}>{userName}</p>
                {locationId?.name && (
                  <p className={css.type}>{locationId.name}</p>
                )}
              </div>
            </article>
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
