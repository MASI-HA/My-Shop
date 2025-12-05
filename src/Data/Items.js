const productList = [
  {
    id: "1",
    title: "Headphone",
    price: 12000000,
    image: "/image/headphone.jpg.jpg",
  },
  {
    id: "2",
    title: "Macbook",
    price: 87000000,
    image: "/image/macbook.jpg.jpg",
  },
  {
    id: "3",
    title: "Iphone",
    price: 65000000,
    image: "/image/apple.jpg.jpg",
  },
  {
    id: "4",
    title: "Mouse",
    price: 5800000,
    image: "/image/mouse.jpg.jpg",
  },
  {
    id: "5",
    title: "Watch",
    price: 23000000,
    image: "/image/watch.webp",
  },
  {
    id: "6",
    title: "Microphone",
    price: 14600000,
    image: "/image/microphone.jpg.jpg",
  },
  {
    id: "7",
    title: "Hard",
    price: 9200000,
    image: "/image/hard.webp",
  },
  {
    id: "8",
    title: "Airpod",
    price: 8750000,
    image: "/image/airpod.jpg.jpg",
  },
];

function getProductData(id) {
  let productData = productList.find((item) => item.id === id);

  return productData;
}

export { productList, getProductData };
