import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Formik, Field } from "formik";
import { useState } from "react";
import "./Order.scss";
import { clearBasket } from "../../store/products-reducer";
import type { FormikValues } from "formik";
import ProductCard from "../../components/ProductCard/ProductCard";
import { tv } from "tailwind-variants";
import {
  AccountBoxOutlined,
  AccountCircleOutlined,
  CreditCard,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../store/account-reducer";
import { format } from "date-fns";
import useHandleUpdateItems from "../../hooks/handle-update-items";
import useHandleGetItems from "../../hooks/handle-get-items";
import type { ProductCardData } from "../../components/basket/basket-product";
const Order = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await handleGetItems("basket");
      if (items) {
        setProducts(items);
      }
    };
    fetchItems();
  }, []);

  const { handleUpdateItems } = useHandleUpdateItems();
  const { handleGetItems } = useHandleGetItems();

  const navigate = useNavigate();
  const { basket } = useSelector((state: any) => state.productsSliceReducer);

  const handlePurchase = () => {
    navigate("/order/complete", {
      state: products,
    });
    handleUpdateItems("basket-clear", null);
    handleUpdateItems("orders", {
      order: self.crypto.randomUUID(),
      timeStamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      items: products,
    });
  };

  const input = tv({
    base: "border border-[#D1D5DB] p-2 rounded-md w-full max-[850px]:text-sm ",
  });

  const label = tv({
    base: "text-[#374151] text-md block mb-1 max-[850px]:text-sm",
  });

  return (
    <div className="order-wrapper max-w-[1024px] m-auto  mt-10">
      <div className="order-title flex flex-col gap-1 text-center">
        <h2 className="text-3xl text-[#111827] max-[850px]:text-2xl">
          Dokończ swój zakup
        </h2>
        <span className="text-md text-[#4B5563] max-[850px]:text-sm">
          Uzupełnij poniższe dane aby dokończyć zamówienie
        </span>
      </div>
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          email: "",
          phoneNumber: "",
          street: "",
          apartment: "",
          city: "",
          postalCode: "",
          deliveryOption: "standard",
        }}
        validate={(values) => {
          const errors = {} as any;

          for (const [key, value] of Object.entries(values)) {
            if (!value) {
              errors[key] = "Uzupełnij pole";
            }
          }

          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Nieprawidłowy adres email";
          }
          return errors;
        }}
        onSubmit={(values) => {
          handlePurchase();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="p-8 max-[850px]:p-2">
            <div className="client-form-wrapper grid grid-cols-2 gap-12 max-[850px]:grid-cols-1">
              <div className="client-information">
                <div className="client-information-title flex gap-2 items-center">
                  <AccountCircleOutlined color="primary" />
                  <span className="text-xl font-bold leading-7 max-[850px]:text-md">
                    Informacje klienta
                  </span>
                </div>
                <div className="client-information-credentials  flex gap-4">
                  <div className="client-information-credentials-name w-full">
                    <label htmlFor="name" className={label()}>
                      Imię
                    </label>
                    <input
                      type="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className={input()}
                      placeholder="Imię"
                    />
                    <span className="text-red-500">
                      {touched.name && errors.name}
                    </span>
                  </div>
                  <div className="client-information-credientials-lastname w-full">
                    <label htmlFor="lastname" className={label()}>
                      Nazwisko
                    </label>
                    <input
                      type="lastname"
                      name="lastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                      className={input()}
                      placeholder="Nazwisko"
                    />
                    <span className="text-red-500">
                      {touched.lastname && errors.lastname}
                    </span>
                  </div>
                </div>
                <div className="client-information-contact mt-2 flex flex-col gap-2">
                  <div className="client-information-contact-email ">
                    <label htmlFor="email" className={label()}>
                      Adres email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={input()}
                      placeholder="email"
                    />
                    <span className="text-red-500">
                      {touched.email && errors.email}
                    </span>
                  </div>
                  <div className="client-infromation-contact-tel">
                    <label htmlFor="tel" className={label()}>
                      Numer telefonu
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phoneNumber}
                      className={input()}
                      placeholder="Numer telefonu"
                    />
                    <span className="text-red-500">
                      {touched.phoneNumber && errors.phoneNumber}
                    </span>
                  </div>
                </div>

                <div className="client-information-address mt-2">
                  <div className="client-information-address-street flex flex-col gap-2">
                    <label htmlFor="street" className={label()}>
                      Nazwa ulicy
                    </label>
                    <input
                      type="text"
                      name="street"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.street}
                      className={input()}
                      placeholder="Adres, nazwa ulicy.."
                    />
                    <span className="text-red-500">
                      {touched.street && errors.street}
                    </span>
                  </div>
                  <div className="client-information-address-apartament">
                    <label htmlFor="apartment" className={label()}>
                      Miejsowość i numer mieszkania
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apartment}
                      className={input()}
                      placeholder="Miejscowość i numer mieszkania"
                    />
                    <span className="text-red-500">
                      {touched.apartment && errors.apartment}
                    </span>
                  </div>
                  <div className="client-infromation-address-details flex w-full gap-2 mt-2">
                    <div className="client-information-address-details-city w-full">
                      <label htmlFor="city" className={label()}>
                        Miasto
                      </label>
                      <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        className={input()}
                        placeholder="Miejscowość"
                      />
                      <span className="text-red-500">
                        {touched.city && errors.city}
                      </span>
                    </div>
                    <div className="client-information-address-details-postalcode w-full">
                      <label htmlFor="postalCode" className={label()}>
                        Kod pocztowy
                      </label>
                      <input
                        type="number"
                        name="postalCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.postalCode}
                        className={input()}
                        placeholder="Kod pocztowy"
                      />
                      <span className="text-red-500">
                        {touched.postalCode && errors.postalCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="client-delivery">
                <div className="client-delivery-product  w-full  bg-neutral-50 rounded-md h-auto p-4">
                  <span className="font-bold text-xl max-[850px]:text-md">
                    Podsumowanie zamówienia
                  </span>
                  {products.map((order: any, idx: number) => (
                    <div
                      key={idx}
                      className="product-wrapper border bg-white rounded-md border-neutral-300 mt-2 p-4"
                    >
                      <div className="client-delivery-product-wrapper flex gap-8 py-4 max-[850px]:flex-col">
                        <img
                          src={order.image}
                          alt="product-image"
                          className="h-24 max-[850px]:h-48 max-[850px]:w-48 max-[850px]:object-contain max-[850px]:m-auto"
                        />
                        <div className="client-delivery-product-wrapper-details grid w-full grid-cols-[1fr_auto] max-[850px]:grid-cols-1">
                          <span>{order.title}</span>
                          <span className="self-start font-bold text-xl">
                            ${order.price}
                          </span>
                        </div>
                      </div>
                      <hr className="text-[#E5E7EB]" />
                      <span className="ml-auto block w-max pt-2 text-right">
                        Ilość: {order.quantity}
                        <br />
                        Cena całkowita: ${order.price * order.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="client-delivery-options mt-2">
                  <span className="text-2xl font-bold max-[850px]:text-xl">
                    Opcje przysłki
                  </span>
                  <div
                    role="group"
                    className="flex flex-col gap-2 mt-2"
                    aria-labelledby="my-radio-group"
                  >
                    <label className={`${input()}  p-4 flex radio relative`}>
                      <Field
                        type="radio"
                        name="deliveryOption"
                        value="standard"
                      />
                      <span className="checkmark" />
                      <div className="options-details-wrapper">
                        <span className="block text-xl max-[850px]:text-md text-[#111827]">
                          Standardowa przesyłka
                        </span>
                        <span className={`${label()} block`}>
                          2-3 dni robocze
                        </span>
                      </div>
                      <div className="option-price font-bold h-min ml-auto">
                        <span>$15.99</span>
                      </div>
                    </label>
                    <label className={`${input()}  p-4 flex`}>
                      <Field
                        type="radio"
                        name="deliveryOption"
                        value="express"
                      />
                      <span className="checkmark" />
                      <div className="options-details-wrapper">
                        <span className="block text-xl max-[850px]:text-md text-[#111827]">
                          Eskpresowa przesyłka
                        </span>
                        <span className={`${label()} block`}>
                          1-2 dni robocze
                        </span>
                      </div>
                      <div className="option-price font-bold h-min ml-auto">
                        <span>$21.99</span>
                      </div>
                    </label>
                    <label className={`${input()}    p-4 flex`}>
                      <Field
                        type="radio"
                        name="deliveryOption"
                        value="inhand"
                      />
                      <span className="checkmark" />
                      <div className="options-details-wrapper">
                        <span className="block text-xl text-[#111827] max-[850px]:text-md">
                          Odbiór osobisty
                        </span>
                        <span className={`${label()} block`}>
                          W godzinach otwarcia sklepu
                        </span>
                      </div>
                      <div className="option-price font-bold h-min ml-auto">
                        <span>Darmowe</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-max ml-auto mt-2 p-2 px-4 rounded-md bg-blue-600 text-white flex gap-2 items-center cursor-pointer"
            >
              <CreditCard />
              Dokonaj zakupu
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Order;
