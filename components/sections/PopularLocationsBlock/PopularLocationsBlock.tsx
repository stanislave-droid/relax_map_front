import Button from "@/components/ui/Button/Button";
import css from "./PopularLocationsBlock.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import LocationCard from "@/components/ui/LocationCard/LocationCard";
import { Location } from "@/types/location";
import SliderArrows from "@/components/ui/SliderArrows/SliderArrows";
type PopularLocationsBlockProps = {
  locations: Array<Location>;
  isLoading?: boolean;
};
const PopularLocationsBlock = ({ locations }: PopularLocationsBlockProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section className={css.popularLocations}>
      <div className="container">
        <h2 className="secondary-headding">Популярні локації</h2>
        <Button className={css.popularLocationsBtn}>Всі локації</Button>
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
                <LocationCard location={location} locationLink={} />
              </SwiperSlide>
            ))}
          </Swiper>
          <SliderArrows
            onPrev={() =>swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
    </section>
  );
};
export default PopularLocationsBlock;
