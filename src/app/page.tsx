"use client";

import { useState } from "react";
import useSWR from "swr";
import { Search } from "lucide-react";
import { Combobox } from "@headlessui/react";
import { useDebounce } from "./hooks/useDebounce";
import { Pagination } from "./components/Pagination";
import { AdvocateCard } from "./components/AdvocateCard";
import { SPECIALTY_LIST } from "./constants/constants";

interface Advocate {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Home() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [specs, setSpecs] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const debouncedName = useDebounce(name, 300);
  const debouncedCity = useDebounce(city, 300);

  const { data, error, isValidating } = useSWR(
    () => `/api/advocates?` +
      new URLSearchParams({
        name: debouncedName,
        city: debouncedCity,
        specialties: specs.join("#"),
        page: String(page),
        pageSize: "6"
      }).toString(),
    fetcher,
    { revalidateOnFocus: false }
  );

  const advocates = data?.data || [];
  const total = data?.total || 0;

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search name…"
            value={name}
            onChange={e => { setName(e.target.value); setPage(1); }}
            className="pl-10 pr-4 py-2 w-full border rounded dark:bg-gray-800"
          />
        </div>

        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search city…"
            value={city}
            onChange={e => { setCity(e.target.value); setPage(1); }}
            className="pl-10 pr-4 py-2 w-full border rounded dark:bg-gray-800"
          />
        </div>

        <Combobox value={specs} onChange={setSpecs} multiple>
          <div className="relative">
            <Combobox.Input
              className="w-full border rounded py-2 px-4 dark:bg-gray-800"
              placeholder="Filter specialties…"
              onChange={e => { }}
            />
            <Combobox.Options className="absolute z-20 mt-1 w-full bg-white border rounded max-h-100 overflow-auto dark:bg-gray-800">
              {SPECIALTY_LIST.map(spec => (
                <Combobox.Option key={spec} value={spec}>
                  {({ selected }) => (
                    <button className={`m-1 ${selected ? "bg-blue-100 text-black" : ""}`}>
                      {spec}
                    </button>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 mb-8">
        {specs.map(spec => (
          <span key={spec} className="px-3 py-1 bg-blue-200 rounded-full dark:text-black">
            {spec} <button onClick={() => setSpecs(specs.filter(s => s !== spec))}>×</button>
          </span>
        ))}
      </div>

      {/* Loading / Error */}
      {isValidating && <p>Loading…</p>}
      {error && <p className="text-red-500">Failed to load advocates.</p>}
      {!error && advocates.length == 0 && <p>No advocate to show.</p>}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {advocates.map((adv: Advocate) => (
          <AdvocateCard key={adv.id} advocate={adv} />
        ))}
      </div>

      {/* Pagination */}
      {total > 6 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / 6)}
          onPageChange={p => setPage(p)}
        />
      )}
    </div>
  );
}
