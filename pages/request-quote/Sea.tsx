import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';
import ByUnits from './ByUnits';

const transportation = [
  {
    id: 1,
    transportation_by: 'Full Container Load (FCL)',
    abbreviation: 'FCL',
    icon: 'https://cdn-icons-png.flaticon.com/512/5340/5340887.png',
  },
  {
    id: 2,
    transportation_by: 'Less than Container Load (LCL)',
    abbreviation: 'LCL',
    icon: 'https://cdn-icons-png.flaticon.com/512/3045/3045754.png',
  },
  {
    id: 3,
    transportation_by: 'Bulk',
    abbreviation: 'Bulk',
    icon: 'https://cdn-icons-png.flaticon.com/512/2821/2821826.png',
  },
];

const container_type = [
  { id: 1, container_type: "20' Standard" },
  { id: 2, container_type: "40' Standard" },
  { id: 3, container_type: "40' High-Cube" },
  { id: 4, container_type: "20' Refrigerated" },
  { id: 5, container_type: "40' Refrigerated" },
  { id: 6, container_type: "20' Open Top" },
  { id: 7, container_type: "40' Open Top" },
  { id: 8, container_type: "20' Flatrack" },
  { id: 9, container_type: "40' Flatrack" },
  { id: 10, container_type: "20' Tank" },
  { id: 11, container_type: "40' Flatrack Collapsible" },
  { id: 12, container_type: "20' Flatrack Collapsible" },
  { id: 13, container_type: "20' Platform" },
  { id: 14, container_type: "40' Platform" },
  { id: 15, container_type: "20' Bulk" },
  { id: 16, container_type: "45' High Cube" },
  { id: 17, container_type: "10' Standard" },
  { id: 18, container_type: 'N/A' },
];

const shiptypes = [
  { id: 1, shiptype: 'Bulk Careers' },
  { id: 2, shiptype: 'Containerships' },
  { id: 3, shiptype: 'General cargo' },
  { id: 4, shiptype: 'Product tankers/Asphalt carriers' },
  { id: 5, shiptype: 'Product tankers/Chemical tankers' },
  { id: 6, shiptype: 'Product tankers/Crude carriers' },
  { id: 7, shiptype: 'Product tankers/Gas carriers' },
  { id: 8, shiptype: 'Specialized/Heavy-lift' },
  { id: 9, shiptype: 'Specialized/Livestock' },
  { id: 10, shiptype: 'Specialized/Refrigerated' },
  { id: 11, shiptype: 'Specialized/RoRo' },
  { id: 12, shiptype: 'Specialized/Wood chip' },
  { id: 13, shiptype: 'N/A' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Sea({ setFormData, formData, handleChange }: any) {
  const [selected, setSelected] = useState(transportation[0]);
  const [selectedContainer, setSelectedContainer] = useState();
  const [selectedShipType, setSelectedShipType] = useState(shiptypes[0]);
  const [byUnits, setByUnits] = useState(false);

  return (
    <>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Listbox
          value={selected}
          onChange={(e) => {
            setSelected(e);
            setFormData({
              ...formData,
              transportation_by: e.abbreviation,
            });
          }}
        >
          {({ open }) => (
            <div className="flex flex-col">
              <label htmlFor="transportation_by" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">
                Transportation By<span className="text-[red]">*</span>
              </label>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg border hover:border-[#4F46E5] border-gray-300 bg-white py-5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <span className="flex items-center">
                    <img src={selected.icon} alt="" className="h-8 w-8 flex-shrink-0 rounded-full" />
                    <span className="ml-3 text-lg block truncate">{selected.transportation_by}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-lg bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {transportation.map((way) => (
                      <Listbox.Option
                        key={way.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'relative cursor-default select-none py-5 pl-3 pr-9',
                          )
                        }
                        value={way}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img src={way.icon} alt="" className="h-8 w-8 flex-shrink-0 rounded-full" />
                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate text-lg')}>
                                {way.transportation_by}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                )}
                              >
                                <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          )}
        </Listbox>
      </div>
      {selected.id === 1 ? (
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <Listbox
            value={selectedContainer}
            onChange={(e) => {
              setSelectedContainer(e);
              setFormData({
                ...formData,
                container_type: e?.['container_type'],
              });
            }}
          >
            {({ open }) => (
              <div className="flex flex-col">
                <label htmlFor="container_type" className="block mb-1 text-xl font-medium text-gray-900 dark:text-gray-300">
                  Container Type<span className="text-[red]">*</span>
                </label>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg border hover:border-[#4F46E5] border-gray-300 bg-white py-5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate text-lg">
                        {selectedContainer?.['container_type'] ? (
                          selectedContainer['container_type']
                        ) : (
                          <p className="text-gray-400 text-lg">Choose Container</p>
                        )}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronDownIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {container_type.map((type) => (
                        <Listbox.Option
                          key={type.id}
                          className={({ active }) =>
                            classNames(
                              active ? 'text-white bg-indigo-600' : 'text-gray-900',
                              'relative cursor-default select-none py-5 pl-3 pr-9',
                            )
                          }
                          value={type}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate text-lg')}>
                                  {type.container_type}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-6',
                                  )}
                                >
                                  <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </div>
            )}
          </Listbox>
          <div>
            <label htmlFor="Quanity of Containers" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">
              Quantity of Containers <span className="text-[red]">*</span>
            </label>
            <input
              type="number"
              name="containers_quantity"
              onChange={(e) => handleChange(e)}
              className="bg-white rounded-lg border border-gray-300 text-gray-900 text-lg focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-5 mb-2"
              placeholder="0"
              required
              onInvalid={(e) => {
                (e.target as HTMLInputElement).setCustomValidity('Enter valid Quantity of Containers.');
                (e.target as HTMLInputElement).style.border = '1px solid red';
              }}
              onInput={(e) => {
                (e.target as HTMLInputElement).setCustomValidity('');
                (e.target as HTMLInputElement).style.border = 'none';
              }}
            />
          </div>
        </div>
      ) : selected.id === 2 ? (
        <div>
          <div className="mb-5">
            <input
              id="bordered-checkbox-1"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              onChange={() => {
                setByUnits(!byUnits);
                setFormData({ ...formData, by_units: !byUnits });
              }}
              className="w-6 h-6 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="bordered-checkbox-1" className="py-4 ml-4 w-full text-xl font-medium text-gray-900 dark:text-gray-300">
              By Units
            </label>
          </div>

          <div>
            {byUnits ? (
              <ByUnits formData={formData} setFormData={setFormData} />
            ) : (
              <div className="grid gap-6 mb-8 md:grid-cols-2">
                {' '}
                <div>
                  <label htmlFor="weight" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">
                    Weight <span className="text-[red]">*</span>
                  </label>
                  <div className="flex items-center bg-white rounded-lg border border-gray-300 focus:outline-[#4F46E5] hover:border-[#4F46E5]  w-full">
                    <input
                      type="number"
                      name="weight"
                      onChange={(e) => handleChange(e)}
                      className="bg-white text-gray-900 text-lg p-5 outline-none w-[85%]"
                      placeholder="0"
                      required
                      onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity('Enter valid Weight.');
                        (e.target as HTMLInputElement).style.border = '1px solid red';
                      }}
                      onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity('');
                        (e.target as HTMLInputElement).style.border = 'none';
                      }}
                    />
                    <div className="w-[15%] border-l-2 border-gray-300 text-gray-500 text-lg flex justify-center items-center">kg</div>
                  </div>
                </div>
                <div>
                  <label htmlFor="volume" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">
                    Volume <span className="text-[red]">*</span>
                  </label>
                  <div className="flex items-center bg-white rounded-lg border border-gray-300 focus:outline-[#4F46E5] hover:border-[#4F46E5]  w-full">
                    <input
                      type="number"
                      name="volume"
                      onChange={(e) => handleChange(e)}
                      className="bg-white text-gray-900 text-lg p-5 outline-none w-[85%]"
                      placeholder="0"
                      required
                      onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity('Enter valid Volume.');
                        (e.target as HTMLInputElement).style.border = '1px solid red';
                      }}
                      onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity('');
                        (e.target as HTMLInputElement).style.border = 'none';
                      }}
                    />
                    <div className="w-[15%] border-l-2 border-gray-300 text-gray-500 text-lg flex justify-center items-center">m³</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <Listbox
              value={selectedShipType}
              onChange={(e) => {
                setSelectedShipType(e);
                setFormData({
                  ...formData,
                  ship_type: e.shiptype,
                });
              }}
            >
              {({ open }) => (
                <div className="flex flex-col">
                  <label htmlFor="ship_type" className="block mb-1 text-xl font-medium text-gray-900 dark:text-gray-300">
                    Ship Type
                  </label>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border hover:border-[#4F46E5] border-gray-300 bg-white py-5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate text-lg">{selectedShipType.shiptype}</span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronDownIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-lg bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {shiptypes.map((type) => (
                          <Listbox.Option
                            key={type.id}
                            className={({ active }) =>
                              classNames(
                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                'relative cursor-default select-none py-5 pl-3 pr-9',
                              )
                            }
                            value={type}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate text-lg')}>
                                    {type.shiptype}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4',
                                    )}
                                  >
                                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </div>
              )}
            </Listbox>
            <div>
              <label htmlFor="Gross Weight" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">
                Gross Weight <span className="text-[red]">*</span>
              </label>
              <div className="flex items-center bg-white rounded-lg border border-gray-300 focus:outline-[#4F46E5] hover:border-[#4F46E5]  w-full">
                <input
                  type="number"
                  name="gross_weight"
                  onChange={(e) => handleChange(e)}
                  className="bg-white text-gray-900 text-lg p-5 outline-none w-[85%]"
                  placeholder="0"
                  required
                />
                <div className="w-[15%] border-l-2 border-gray-300 text-gray-500 text-lg flex justify-center items-center">kg</div>
              </div>
            </div>
          </div>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div>
              <label htmlFor="Gross Weight" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">
                Loading Rate
              </label>
              <input
                type="number"
                name="loading_rate"
                onChange={(e) => handleChange(e)}
                className="bg-white rounded-lg border border-gray-300 text-gray-900 text-lg focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-5 mb-2"
              />
            </div>
            <div>
              <label htmlFor="Discharging Rate" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-300">
                Discharging Rate
              </label>
              <div className="flex items-center bg-white rounded-lg border border-gray-300 focus:outline-[#4F46E5] hover:border-[#4F46E5]  w-full">
                <input
                  type="number"
                  name="discharging_rate"
                  onChange={(e) => handleChange(e)}
                  className="bg-white text-gray-900 text-lg p-5 outline-none w-[80%]"
                  placeholder="0"
                />
                <div className="w-[20%] border-l-2 border-gray-300 text-gray-500 text-lg flex justify-center items-center">kg/day</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
