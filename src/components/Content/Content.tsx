import { useState, useEffect, Suspense, lazy } from "react";
import { useLocation, useParams } from "react-router-dom";
import { matchSorter } from "match-sorter";
import { controller, format } from "../../util";
import SearchBar from "./SearchBar";
import AddCard from "../AddCard";
import Loading from "./Loading";
const CardRenderer = lazy(() => import("./CardRenderer"));
const ClientPanel = lazy(() => import("./ClientPanel"));

function Content({ title = "" }) {
  const [data, setData] = useState([{}]);
  let allData: any;
  const [auxData, setAuxData] = useState({});
  const [keyword, setKeyword] = useState("");

  /* Get the current location and their params */
  const location = useLocation().pathname;
  let param = useParams().cliente + "";

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      switch (location) {
        case "/cliente":
          const cli = await controller.CustomerController.getAllCustomers();
          setData(cli);
          allData = cli;
          console.log(cli);

          break;

        case "/examen/" + param:
          const exa = await controller.ExamController.getAllExams(param + "");
          const cliAux = await controller.CustomerController.getCustomerById(
            param + ""
          );

          setData(exa.sort((a, b) => (a.fecha < b.fecha ? 1 : -1)));
          allData = exa.sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
          setAuxData(cliAux);
          break;

        case "/proveedor":
          const sup = await controller.SupplierController.getAllSuppliers();
          setData(sup);
          allData = sup;
          break;

        case "/usuario":
          const emp = await controller.EmployeeController.getAllEmployees();
          setData(emp);
          allData = emp;
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

  function formatData() {
    switch (location) {
      case "/cliente":
        data.map((d) => {
          d.res = d.nombre + " " + d.primer_apellido + " " + d.segundo_apellido;
          d.id = d.id;
        });
        break;

      case "/examen/" + param:
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
        {location == "/examen/" + param ? <ClientPanel data={auxData} /> : null}
        <AddCard />
        <CardRenderer data={data} />
      </Suspense>
    </>
  );
}

export default Content;
