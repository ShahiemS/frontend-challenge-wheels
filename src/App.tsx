import "./global.css";

import Header from "./components/organisms/Header";
import Loading from "./components/atoms/Loading";
import ListView from "./components/organisms/ListView";
import MapView from "./components/organisms/MapView";
import Pagination from "./components/molecules/Pagination";
import { View } from "./interfaces/SearchConfig";
import { useSearchStore } from "./store/useSearchStore";
import CarpoolCostShare from "./components/molecules/CarpoolCostShare";

function App() {
  const getFilteredResults = useSearchStore(
    (state) => state.getFilteredResults
  );
  const filteredResults = getFilteredResults();
  const paginatedResults = useSearchStore(
    ({ paginatedResults }) => paginatedResults
  );

  const isLoading = useSearchStore(({ isLoading }) => isLoading);
  const view = useSearchStore(({ view }) => view);

  return (
    <>
      <h1 className="text-4xl font-semibold text-black mb-4 flex items-center my-6 justify-center gap-2">
        mywheels
        <span className="px-3 py-1 bg-green-100 border border-green-600 text-green-700 text-xs font-semibold rounded-full">
          Carpool
        </span>
      </h1>
      <div className="max-w-5xl mx-auto my-8 bg-gray-100 rounded-2xl shadow-xl overflow-hidden">
        <Header />

        <div className="p-10 space-y-5">
          {isLoading && <Loading />}

          {!isLoading && view === View.List && (
            <>
              <ListView results={paginatedResults} />
              <Pagination />
            </>
          )}

          {!isLoading && view === View.Map && (
            <MapView results={filteredResults} />
          )}

          {view === View.Carpool && <CarpoolCostShare />}
        </div>
      </div>
    </>
  );
}

export default App;
