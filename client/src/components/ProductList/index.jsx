import { useEffect, useMemo } from 'react';
import ProductItem from '../ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../../utils/storeSlice';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // Correctly use useMemo outside of useSelector
  const products = useSelector(state => state.products || []);
  const currentCategory = useSelector(state => state.currentCategory || '');

  const filteredProducts = useMemo(() => {
    if (!currentCategory) {
      return products;
    }
    // Assuming there's logic here to filter products based on the current category
    return products.filter(product => product.category === currentCategory);
  }, [products, currentCategory]); // Correct dependencies

  useEffect(() => {
    if (data) {
      dispatch(updateProducts(data.products));
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch(updateProducts(products));
      });
    }
  }, [data, loading, dispatch]);


  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products && products.length ? ( // Check if products is not undefined and has items
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;