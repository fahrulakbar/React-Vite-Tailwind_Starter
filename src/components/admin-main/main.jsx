import React from 'react'
import Line from '../../components/charts/linechart/line'
import Cards from '../../components/admin-sale-cards/cards'
import Options from '../../components/options/options'
import Bar from '../../components/charts/bar-graph/bar'
import { dateCards } from '../../dates/jummy'
import DashboardPost from '../admin_potensi/potensi_component'
const Main = () => {
    return (
      <div className="p-6 mb-6 bg-slate-50 min-h-screen">
        {/* <div className="">
          <Options />
        </div> */}
  
        <div className="">
          <Cards />
        </div>
  
        <div className="flex gap-4 flex-wrap">
          <div className="p-6 w-full my-4 lg:w-[64%] bg-white rounded-xl">
            <div className="ext-zinc-900 text-base font-medium leading-normal mb-8"> Tentang Desa </div>
            <div className="justify-start items-start gap-2 flex flex-wrap">
              {dateCards.map(({ text, earn, percent, color }) => (
                <div
                  key={text}
                  className={`grow shrink basis-0 h-[100px] p-3 bg-white rounded-sm shadow border-t-2 ${color} flex-col justify-start items-start gap-4 inline-flex`}
                >
                  <div className="self-stretch text-zinc-500 text-xs font-medium leading-[18px]">{text}</div>
                  <div className="self-stretch justify-start items-baseline gap-1 inline-flex">
                    <div className="text-zinc-900 text-xl font-semibold leading-[30px]">Rp{earn}</div>
                    <div className="grow shrink basis-0 text-lime-500 text-xs font-normal leading-[18px]">+{percent}</div>
                  </div>
                </div>
              ))}
            </div>
            <Line />
          </div>
          <div className="p-6 w-full my-4 lg:w-1/3 bg-white rounded-xl">
            <DashboardPost
                endpoint="/potensi"
                title="Potensi Desa"
              />
              {/* <Bar /> */}
            </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="w-full lg:w-1/2">
            <DashboardPost
              endpoint="/geografis"
              title="Informasi Geografis"
            />
          </div>
          <div className="w-full  lg:w-1/3">
            <DashboardPost
              endpoint="/sejarah"
              title="Sejarah Desa"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <DashboardPost
              endpoint="/tentang-kami"
              title="Tentang Kami"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Main;