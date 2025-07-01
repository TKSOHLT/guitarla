//! Nota: React siempre hará un render completo de la app, esto es costoso y para evitarlo podemos usar **useMemo**
//! Sin embargo, el hook useMemo es enfocado al performance, algunas veces catchear demasiado una variable entre renders
//! puede ser contra producente catchear tantos datos

import { useCart } from "../hooks/useCart";

export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal }) {
  //*State derivado
  // const isEmpty = () => cart.length === 0;
  // const cartTotal = () => cart.reduce( (total, item) => total + (item.price * item.quantity), 0);

  //*useMemo para mejorar el performance (evita los states derivados), se parece a computed de vue
  // const isEmpty = useMemo(() => cart.length === 0, [cart]);
  // const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.price * item.quantity), 0), [cart]);

  // const {isEmpty, cartTotal} = useCart(); //!Eso está duplicando la instancia de useCart

  return (
    //<> = fragment, tambien <Fragment> y tambien <React.Fragment>, entonces <> = <Fragment> = React.Fragment
    // <React.Fragment>
    //     <h1>Hola {name}</h1>
    // </React.Fragment>
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">${guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button type="button" className="btn btn-dark" onClick={() => decreaseQuantity(guitar.id)}>
                                -
                              </button>
                              {guitar.quantity}
                              <button type="button" className="btn btn-dark" onClick={ () => increaseQuantity(guitar.id)}>
                                +
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-danger" type="button" onClick={() =>removeFromCart(guitar.id)}>
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal}</span>
                    </p>
                    <button className="btn btn-dark w-100 mt-3 p-2" onClick={clearCart}>
                      Vaciar Carrito
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
