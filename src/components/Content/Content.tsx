import { useState, useEffect, Suspense, lazy } from "react";
import { useLocation, useParams } from "react-router-dom";
import { matchSorter } from "match-sorter";
import InfiniteScroll from "react-infinite-scroller";
import { controller, format } from "../../util";
import SearchBar from "./SearchBar";
import AddCard from "../AddCard";
import Loading from "./Loading";
const CardRenderer = lazy(() => import("./CardRenderer"));

function Content({ title = "" }) {
  const [data, setData] = useState([{}]);
  const [allData, setAllData] = useState([{}]);
  const [auxData, setAuxData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const cardAmount = 2;
  const [records, setRecords] = useState(cardAmount);

  /* Get the current location and their params */
  const location = useLocation().pathname;
  let param = useParams();

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      switch (location) {
        case "/cliente":
          const cli = await controller.CustomerController.getAllCustomers();
          setData(cli);
          setAllData(cli);
          break;

        case "/examen/" + param.cliente:
          const exa = await controller.ExamController.getAllExams(
            param.cliente + ""
          );
          const cliAux = await controller.CustomerController.getCustomerById(
            param.cliente + ""
          );

          setData(exa.sort((a, b) => (a.fecha < b.fecha ? 1 : -1)));
          setAllData(exa.sort((a, b) => (a.fecha < b.fecha ? 1 : -1)));
          setAuxData(cliAux);
          break;

        case "/proveedor":
          const sup = await controller.SupplierController.getAllSuppliers();
          setData(sup);
          setAllData(sup);
          break;

        case "/usuario":
          const emp = await controller.EmployeeController.getAllEmployees();
          setData(emp);
          setAllData(emp);
          break;

        default:
          /* This shouldn't happen */
          const def = [
            {
              rfc: "1",
              razon_social: "No data",
            },
          ];
          setData(def);
          break;
      }
    }
    getData();
  }, []);

  function loadMore() {
    records <= data.length
      ? setHasMore(true)
      : setTimeout(() => {
          setRecords(records + cardAmount);
        }, 3000);
  }

  function formatData() {
    switch (location) {
      case "/cliente":
        data.map((d) => {
          d.res = d.nombre + " " + d.primer_apellido + " " + d.segundo_apellido;
          d.id = d.CURP;
        });
        break;

      case "/examen/" + param.cliente:
        data.map((d) => {
          d.res = format.dateStringFormat(d.fecha + "");
          d.id = d.fecha;
        });
        break;

      case "/proveedor":
        data.map((d) => {
          d.res = d.razon_social;
          d.id = d.rfc;
        });
        break;

      case "/usuario":
        data.map((d) => {
          d.res = d.nombre + " " + d.primer_apellido + " " + d.segundo_apellido;
          d.id = d.rfc;
        });
        break;

      default:
        break;
    }
  }

  const search = (keyword: string) => {
    let matches = matchSorter(allData, keyword, {
      keys: ["res"],
      threshold: matchSorter.rankings.CONTAINS,
    });
    setKeyword(keyword);

    if (keyword === "") {
      setData(allData);
    } else {
      setData(matches.sort((a, b) => (a.id < b.id ? 1 : -1)));
    }
  };

  return (
    <>
      {formatData()}
      <SearchBar keyword={keyword} onChange={search} />
      <h1 className="text-2xl m-5">{title}</h1>

      <Suspense fallback={<Loading />}>
        {location == "/examen/" + param.cliente ? (
          <>
            <div className="panel">
              <table className="table-fixed w-full">
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="nombre">Cliente</label>
                    </td>
                    <td colSpan={5}>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="text-input"
                        value={
                          auxData.nombre +
                          " " +
                          auxData.primer_apellido +
                          " " +
                          auxData.segundo_apellido
                        }
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="dom">Domicilio</label>
                    </td>
                    <td colSpan={5}>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="text-input"
                        value={auxData.domicilio}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="tel">Teléfono</label>
                    </td>
                    <td colSpan={5}>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="text-input"
                        value={format.phoneStringFormat(auxData.telefono + "")}
                        readOnly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : null}
        <AddCard />
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          useWindow={true}
          className="w-full ml-[14rem]"
        >
          <CardRenderer data={data} />
        </InfiniteScroll>
      </Suspense>
    </>
  );
}

export default Content;
