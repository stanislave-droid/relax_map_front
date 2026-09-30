"use client";
import css from "./PopularLocationsBlock.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import LocationCard from "@/components/ui/LocationCard/LocationCard";
import { Location } from "@/types/location";
import SliderArrows from "@/components/ui/SliderArrows/SliderArrows";
import Link from "@/components/ui/Link/Link";
type PopularLocationsBlockProps = {
  locations: Array<Location>;
  isLoading?: boolean;
};
const PopularLocationsBlock = ({ locations }: PopularLocationsBlockProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section className={css.popularLocations}>
      <div className="container">
        <div className={css.headingPopularLocations}>
          <h2 className="secondary-headding">Популярні локації</h2>
          <Link
            href="/locations"
            variant="primary"
            className={css.linkAllLocations}
          >
            Всі локації
          </Link>
        </div>
        <div className={css.locationsSwiper}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1440: {
                slidesPerView: 3,
              },
            }}
          >
            {locations.map((location) => (
              <SwiperSlide key={location._id}>
                <LocationCard
                  location={location}
                  locationLink={`${process.env.NEXT_PUBLIC_SITE_URL}/locations/${location._id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={css.navigationBtns}>
            <SliderArrows
              onPrev={() => swiperRef.current?.slidePrev()}
              onNext={() => swiperRef.current?.slideNext()}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default PopularLocationsBlock;
