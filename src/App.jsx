import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useCart } from "./hooks/useCart";

//Un componente es una función de JS, el nombre siempre inician con Mayúsculas
function App() {

  const { data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal } = useCart();


  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* Aquì no se puede colocar Statements, pero si expresiones */}
          {data.map((guitar)=> 
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          )}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;

//Los Hooks son funciones que permiten añadir el estado y ciclo de vista de
//los componentes de React, a los componentes funcionales

//Hooks disponibles:

/**
 * useState       useReducer      useRef                  useInsertionEffect     useId
 * useEffect      useCallback     useImperativeHandle     useTransition          useSyncExternalStorage
 * useContext     useMemo         useLayoutEffect         UseDeferredValue
 */

//Ejemplo:
/**
 *         state      función        Hook  Valor Inicial 
 *           |           |            |      |
 * const [customer, setCustomer] = useState({});
 */

//!Reglas:
/**
 * 1. Los hooks se colocan en la parte superior de los componentes de react
 * 2. No se deben colocar dentro de condicionales, tampoco después de un return
 */

  //!State
  // const [auth, setAuth] = useState(false);
  // const [total, setTotal] = useState(0);
  // const [cart, setCart] = useState([]);

  //!Effect
  //Siempre tiene un callback, depende de su declaración para realizar acciones
  //Es el sustituto de componentDidMount() y componentDidUpdate()
  //Sintaxis:
  /*
    *  useEffect(()=> {
    *   console.log("El componente está listo")
    *  }, [] => esto se le conoce como "arreglo de dependencias" )
   */
  //El useEffect se ejecuta cuando el componente està listo, es un buen lugar
  //para consultar una API o el LocalStorage.
  //Debido a que le podemos pasar una dependencia y esta puede ser state,
  //va a estar escuchando por los cambnios que sucedan en ese state y se puede
  //ejecutar funcinoes cuando detecte ese cambio

  //*Ejemplo:
  /* 
    * useEffect(()=> {
    *   console.log("Escuchando por auth");
    * }, [auth])
  */

  /* 
    *setTimeout(() => {
    *   setAuth(true);
    * }, 3000);
  */


/**
 * !Statements
 * 
 * Una app de JS es una serie de statements, cada statement es una
 * instrucciòn para hacer algo.
 * 
 * Algunos statements son:
 *    - Creación de variables
 *    - Código condicionales con if
 *    - Lanzar errores con throw new Error()
 *    - Iterar con While o For
 */

/**
 * !Expressions
 * 
 * Una expresión es algo que produce un valor.
 * 
 * Algunos expressions son:
 *    - Ternarios
 *    - Utilizar un Array Method que genere un nuevo array.
 *    - .map que genera un nuevo array a diferencia de forEach
 */

/**
 * !Inmutabilidad
 * 
 * Todos los states deben ser inmutables, no se puede hacer algo como setCart((prevCart) => prevCart.push(item)) o cart.push(item)
 * 
 */

