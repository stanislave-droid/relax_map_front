import Button from "@/components/ui/Button/Button";
import css from "./PopularLocationsBlock.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
type PopularLocationsBlockProps = {
  locations: Array<LocationCardData>;
  isLoading?: boolean;
};
const PopularLocationsBlock = ({ locations }: PopularLocationsBlockProps) => {
  return (
    <section className={css.popularLocations}>
      <div className="container">
        <h2 className="secondary-headding">Популярні локації</h2>
        <Button className={css.popularLocationsBtn}>Всі локації</Button>
        <div className={css.locationsSwiper}>
          <Swiper
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
              <SwiperSlide key={location._}></SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default PopularLocationsBlock;
