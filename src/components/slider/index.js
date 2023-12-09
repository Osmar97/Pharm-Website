import { Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';

export default function Slider() {
  return (
    <div className="w-screen overflow-hidden">
      <Carousel className="w-full h-full">
        <Carousel.Item>
          <img
            className=" object-fill w-100 h-96"
            src="https://images.unsplash.com/photo-1468083862589-ba52a0b63775?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzdGV8ZW58MHx8MHx8fDA%3D"
            alt="First slide"
          />
          <Carousel.Caption className="text-white">
            <h3 className="text-2xl font-bold">First slide label</h3>
            <p className="text-lg">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=" object-fill w-100 h-96"
            src="https://images.unsplash.com/file-1695862017053-979d119af2a6image?dpr=2&w=416&auto=format&fit=crop&q=60"
            alt="Second slide"
          />
          <Carousel.Caption className="text-white">
            <h3 className="text-2xl font-bold">Second slide label</h3>
            <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=" object-fill w-100 h-96"
            src="https://images.unsplash.com/photo-1693331350465-dd00074edcd1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRlc3RlfGVufDB8fDB8fHww"
            alt="Third slide"
          />
          <Carousel.Caption className="text-white">
            <h3 className="text-2xl font-bold">Third slide label</h3>
            <p className="text-lg">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
