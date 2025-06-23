import { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import { useGetProducts } from "../../hooks/use-get-products";
import { useDispatch } from "react-redux";
import { setProducts } from "../../store/products-reducer";
import ProductsList from "../../components/ProductsList/ProductsList";
import { useToast } from "../../hooks/use-toast";

const Home = () => {
  const { handleGetProducts } = useGetProducts();
  const dispatch = useDispatch();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await handleGetProducts();
        if (result) {
          dispatch(setProducts(result));
        }
      } catch (error) {
        console.error("Błąd...");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />
      <ProductsList />
    </div>
  );
};

export default Home;
