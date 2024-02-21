import { useState } from 'react'
import { Line } from 'react-chartjs-2'

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import { PriceHistoryType } from './type'

export const PriceHistoryChart = ({
  contractAddress,
}: {
  contractAddress: string
}) => {
  //using mock data for now
  //   const { data: priceHistory } = usePriceHistory({ contractAddress })
  const nftData = [
    {
      price: '0.0000001395',
      date: '2/6/23',
      hash: '0x8870e09820aa10765a7d63c52814627b74445835dcc719190bcc45a01a2723bf',
      block: 16564850,
    },
    {
      price: '69.03001',
      date: '2/5/23',
      hash: '0x8ce7337cad41c295ea2b4ea3a31d45e68d511dbbd03c997283350252bc140d45',
      block: 16556273,
    },
    {
      price: '70.0342',
      date: '2/6/23',
      hash: '0x5d9619ce062f6ab677eb09c00440196540388835ee30aa9e5fcdee03306eea47',
      block: 16565494,
    },
    {
      price: '69.0001',
      date: '2/4/23',
      hash: '0xf4899cb2fa58bb8bd7c9282139cf4bb090177a020483823fea285b2d321e6796',
      block: 16549706,
    },
    {
      price: '73.8',
      date: '2/4/23',
      hash: '0xe29cc90794c67f543c21faa62b68471528f84121f5306ab997dcc4215c1c8b6b',
      block: 16548792,
    },
    {
      price: '67.1001',
      date: '2/1/23',
      hash: '0xb4ee66974cc9621ef6b9ce1206b52df5a25d66b05099bf98a3617d9686e2de50',
      block: 16533099,
    },
    {
      price: '69.0',
      date: '1/31/23',
      hash: '0x1b5f8e8326353ec1c77aa660b4d159409ebfe40bfe8c26c6cb69a063b4bed390',
      block: 16523724,
    },
    {
      price: '76.0',
      date: '1/31/23',
      hash: '0xdd887898a2f8120bc5bf0e565db2c0189fdc7ac4d81c255e0574820b91455f0a',
      block: 16522305,
    },
    {
      price: '69.001',
      date: '1/30/23',
      hash: '0x5a74402f89a9b69aa0c36f33b897e99393149ce948d967001affe6652b7733be',
      block: 16518717,
    },
    {
      price: '105.0',
      date: '1/30/23',
      hash: '0x559f432f77a3b5fda5662e2d0211ff69152aa455b24840eb0226bb6f240288fb',
      block: 16517637,
    },
    {
      price: '70.0',
      date: '1/30/23',
      hash: '0x5b1add4cccd641e3745d9327a4edb5c6f2f1a875a590087b65637dd515f9240a',
      block: 16516774,
    },
    {
      price: '70.01',
      date: '1/29/23',
      hash: '0xbeaaaabc57082549647710670f8c2d60f02e9b783f60d5f19ce6303b7eba0805',
      block: 16511764,
    },
    {
      price: '67.8901',
      date: '1/23/23',
      hash: '0xb916c62cf5a8bb6f67ae5d22bb1c8913c8602c4255f95fc86871c62f23aec030',
      block: 16464096,
    },
    {
      price: '92.0',
      date: '1/21/23',
      hash: '0x7c07e8b91cf6f6759ac3f871ccf0384efb5161d834d968e1162b747bcf1d1a0b',
      block: 16450457,
    },
    {
      price: '65.0',
      date: '1/20/23',
      hash: '0x425b4f3fc5c26c041a7ddcd07b88ac6b65b00b7918ac13bff316725010af2800',
      block: 16446061,
    },
    {
      price: '66.9',
      date: '1/18/23',
      hash: '0x50499fb5f45d0caed8f1698ac8d4096b0d5b9f527ab56c69f3099f3471205633',
      block: 16428258,
    },
    {
      price: '70.1',
      date: '1/17/23',
      hash: '0xddee47a0a6a63e6dc8080215e0a4219f343b323d11d00a7302d384c5f6bff574',
      block: 16424547,
    },
    {
      price: '72.0',
      date: '1/17/23',
      hash: '0xbc4afb84a33a289cd1dc400ab8b69b794c1d64d22c34ff47c8d7cb36b0b4adcd',
      block: 16424254,
    },
    {
      price: '70.5',
      date: '1/17/23',
      hash: '0x5294d2b7e561015c3f050edc739e97f16af791c58ab5787491efc873acd91b2c',
      block: 16422412,
    },
    {
      price: '75.0',
      date: '1/15/23',
      hash: '0x9e84e172908a01c925cbe21db697098d59cf043db44df7b64a89e9b83fb5b5f8',
      block: 16408602,
    },
    {
      price: '71.5',
      date: '1/14/23',
      hash: '0xcbc1091f18675a3963428f71591287dc8b6ecb5bed2b188c029436049caf4d78',
      block: 16403332,
    },
    {
      price: '70.0',
      date: '1/14/23',
      hash: '0x36d90e5fe6e20e903b3c37fed18576d0e34b60a6e8aa344842768619e32eff50',
      block: 16398359,
    },
    {
      price: '75.0',
      date: '1/12/23',
      hash: '0x820902152d2c77ff0f83e8dc095d07736e4e72b2a52ccd180a98c0809818ac8f',
      block: 16389713,
    },
    {
      price: '72.0',
      date: '1/12/23',
      hash: '0x20f73b10356579c4e67feaa7e871ff249372b1e43934f3fd78e1693acb3ebfd9',
      block: 16388292,
    },
    {
      price: '80.26',
      date: '1/12/23',
      hash: '0xbe878c88582c620bc5ae5fc9a93bbe58ed70598b0389ead695f6f62431af8483',
      block: 16387812,
    },
    {
      price: '78.0',
      date: '1/12/23',
      hash: '0xc2df309d8ff5f2e1da2f6dc3f19b37b49fe707ca45496e1e6e401987e694931a',
      block: 16387705,
    },
    {
      price: '79.7651',
      date: '1/12/23',
      hash: '0xe1bc0f616f6bd8737bc4317669a7cf03622c39dfdf3727d1e551126803e9ecd3',
      block: 16387582,
    },
    {
      price: '79.079',
      date: '1/11/23',
      hash: '0x59776a94737769308ca02fdc7fdf9ac251eb886969817eae5181d281fec91e1d',
      block: 16377533,
    },
    {
      price: '82.5',
      date: '1/10/23',
      hash: '0x4bb8056107114943d189411975dd92d14f233dde75e715aeabf78d55707f0860',
      block: 16374634,
    },
    {
      price: '80.2',
      date: '1/10/23',
      hash: '0xd61ae3f408545e3ecac1111348e70a4b702d0f4e27a36f93e4eff2d3074759e2',
      block: 16371892,
    },
    {
      price: '81.5',
      date: '1/10/23',
      hash: '0x742a63afcecde8182df3ce4da34464ba44eb6046d4c0e3d0934b04f891335b22',
      block: 16371882,
    },
    {
      price: '79.0',
      date: '1/9/23',
      hash: '0x1b250461136e9b6bbc453b1e8be0238c85f9726c86c164f362a10f9ad297ecdc',
      block: 16367877,
    },
    {
      price: '80.3',
      date: '1/8/23',
      hash: '0x87c6b78a8cc807d62242f21674c27ae93ee8e4fb00f2748bef73c04b44ab96df',
      block: 16361090,
    },
    {
      price: '81.081',
      date: '1/8/23',
      hash: '0x9f2ce0487ea5684b0b15c430d0a8b46bd2196625dd81c6f1c0db923bb8886fef',
      block: 16357583,
    },
    {
      price: '82.69',
      date: '1/6/23',
      hash: '0x9293a24718f1f4f2a41ce34ecd94875cdc1215dcf6d086e9f7ccc045f02bb08b',
      block: 16345645,
    },
    {
      price: '76.1111',
      date: '1/5/23',
      hash: '0xf14f780d55e14710e2c9ecaa0c3153635a4ef5e1e87ec19a1d3a4181dc5bd7fb',
      block: 16336549,
    },
    {
      price: '77.78',
      date: '1/4/23',
      hash: '0xb12d1cbdcf8de2b7d699a2483f2685a69dfdfaa6755e752ac6f107d61b222d79',
      block: 16330786,
    },
    {
      price: '76.76001',
      date: '1/4/23',
      hash: '0x6f4333c3d3e201a105af90474bb1c1f1d3ac02276e7c6727aa8dc45c2c63cc02',
      block: 16327569,
    },
    {
      price: '75.2',
      date: '1/3/23',
      hash: '0xecbf932fb950efad6cbb46de314e9d90384f96d2e35893ee776b8ad8b30e59ba',
      block: 16324570,
    },
    {
      price: '95.0',
      date: '1/3/23',
      hash: '0x0706c43d4e8fb6c90344711174eaced380c7cb054dbb81823db3a99a1f5ca0a8',
      block: 16320464,
    },
  ]
  const [days, setDays] = useState(7)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
  )

  const filterOutliers = (data: PriceHistoryType[]) => {
    //some prices that get returned from the API stray far from the mean
    //we need to filter out these outliers to get a more accurate price history chart

    //get only the prices from the array
    const prices = data.map((item) => item.price)

    //sort the prices from lowest to highest
    prices.sort((a, b) => Number(a) - Number(b))

    //formula to calculate the interquartile range
    const q1 = prices[Math.floor(prices.length / 4)]
    const q3 = prices[Math.ceil(prices.length * (3 / 4))]
    const iqr = Number(q3) - Number(q1)

    //filter out the outliers
    const filteredPrices = prices.filter(
      (price) =>
        Number(price) >= Number(q1) - 1.5 * iqr &&
        Number(price) <= Number(q3) + 1.5 * iqr,
    )

    //filter out the outliers from the original array
    const filteredData = data.filter((item) =>
      filteredPrices.includes(item.price),
    )

    //return the filtered array
    return filteredData
  }

  const getCheapestPrice = (data: PriceHistoryType[]) => {
    //get the cheapest price for each day using reduce
    const result = data.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = curr.price
      } else {
        acc[curr.date] = Math.min(acc[curr.date], Number(curr.price))
      }
      return acc
    }, {})

    return Object.entries(result).map(([date, price]) => ({ date, price }))
  }

  //filter out outliers and return cheapest price from each day sorted by date
  const sortedData: PriceHistoryType[] = getCheapestPrice(
    filterOutliers(nftData),
  )

  const options = {
    responsive: true,
    scales: {
      y: {
        min: Math.round(
          sortedData
            .slice(0, days)
            .map((sale) => Number(sale.price))
            .sort((a, b) => a - b)[0] * 0.95,
        ),
        max: Math.round(
          sortedData
            .slice(0, days)
            .map((sale) => Number(sale.price))
            .sort((a, b) => b - a)[0] * 1.05,
        ),
        ticks: {
          callback: function (val, index) {
            return `${this.getLabelForValue(Number(val))} ETH`
          },
        },
      },
    },
  }
  const data = {
    labels: sortedData
      ?.slice(0, days)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((sale) => sale.date),
    datasets: [
      {
        data: sortedData
          ?.slice(0, days)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )

          .map((sale) => sale.price),

        borderColor: 'white',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  }

  return <Line options={options} data={data} />
}
