import { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import { useGetProducts } from "../../hooks/use-get-products";
import { useDispatch } from "react-redux";
import { setNewArrivals, setProducts } from "../../store/products-reducer";
import ProductsList from "../../components/ProductsList/ProductsList";
import { useToast } from "../../hooks/use-toast";
import NewArrivals from "../../components/home/new-arrivals";
import BestSellers from "../../components/home/best-sellers";
import Collaborations from "../../components/home/collaborations";

const Home = () => {
  const { handleGetProducts } = useGetProducts();
  const dispatch = useDispatch();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await handleGetProducts();
        if (result) {
          dispatch(setNewArrivals(result));
          dispatch(setProducts(result));
        }
      } catch (error) {
        console.error("Błąd...", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />
      <ProductsList />
      <NewArrivals />
      <BestSellers />
      <Collaborations />
    </div>
  );
};

export default Home;
