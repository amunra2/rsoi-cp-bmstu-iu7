import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth-service';
import Text from '../components/text';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import dayjs, { Dayjs } from 'dayjs';
import { Chip, ThemeProvider } from '@mui/material';
import { MyTheme } from '../theme-mui';
import { BarChart } from '@mui/x-charts/BarChart';


interface Column {
  id: "id" | "url" | "statusCode" | "time";
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { 
    id: "id",
    label: "ID",
    minWidth: 70
  },
  {
    id: "url",
    label: "URL",
    minWidth: 300,
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "statusCode",
    label: "Код ответа",
    minWidth: 170 
  },
  {
    id: "time",
    label: "Время",
    minWidth: 170,
    align: "right",
    // format: (value: number) => value.toFixed(2),
  },
];

interface StatisticInterface {
  id: number;
  url: string;
  statusCode: number;
  time: string;
}

export interface StatisticResponseInterface {
  items: StatisticInterface[];
  page: number;
  pageSize: number;
  totalElements: number;
}

function createData(
  id: number,
  url: string,
  statusCode: number,
  timeDayjs: Dayjs,
): StatisticInterface {
  const time = timeDayjs.format("DD/MM/YYYY (HH:mm)");
  return { id, url, statusCode, time };
}

interface StatisticsFilter {
  page: number;
  pageSize: number;
}

const fetchStatstics = (filter: StatisticsFilter): StatisticResponseInterface => {
  const items = [
    createData(1, "http://localhost:3000", 200, dayjs()),
    createData(2, "http://localhost:3000", 201, dayjs()),
    createData(3, "http://localhost:3000", 204, dayjs()),
    createData(4, "http://localhost:3000", 400, dayjs()),
    createData(5, "http://localhost:3000", 401, dayjs()),
    createData(6, "http://localhost:3000", 403, dayjs()),
    createData(7, "http://localhost:3000", 404, dayjs()),
    createData(8, "http://localhost:3000", 200, dayjs()),
    createData(9, "http://localhost:3000", 201, dayjs()),
    createData(10, "http://localhost:3000", 204, dayjs()),
    createData(11, "http://localhost:3000", 200, dayjs()),
    createData(12, "http://localhost:3000", 201, dayjs()),
    createData(13, "http://localhost:3000", 204, dayjs()),
    createData(14, "http://localhost:3000", 400, dayjs()),
    createData(15, "http://localhost:3000", 401, dayjs()),
    createData(16, "http://localhost:3000", 403, dayjs()),
    createData(17, "http://localhost:3000", 404, dayjs()),
    createData(18, "http://localhost:3000", 200, dayjs()),
    createData(19, "http://localhost:3000", 201, dayjs()),
    createData(20, "http://localhost:3000", 204, dayjs()),
    createData(21, "http://localhost:3000", 307, dayjs()),
    createData(22, "http://localhost:3000", 201, dayjs()),
    createData(23, "http://localhost:3000", 204, dayjs()),
    createData(24, "http://localhost:3000", 305, dayjs()),
    createData(25, "http://localhost:3000", 501, dayjs()),
    createData(26, "http://localhost:3000", 303, dayjs()),
    createData(27, "http://localhost:3000", 404, dayjs()),
    createData(28, "http://localhost:3000", 500, dayjs()),
    createData(29, "http://localhost:3000", 201, dayjs()),
    createData(30, "http://localhost:3000", 304, dayjs()),
    createData(21, "http://localhost:3000", 307, dayjs()),
    createData(22, "http://localhost:3000", 201, dayjs()),
    createData(23, "http://localhost:3000", 204, dayjs()),
    createData(24, "http://localhost:3000", 305, dayjs()),
    createData(25, "http://localhost:3000", 501, dayjs()),
    createData(26, "http://localhost:3000", 303, dayjs()),
    createData(27, "http://localhost:3000", 404, dayjs()),
    createData(28, "http://localhost:3000", 500, dayjs()),
    createData(29, "http://localhost:3000", 201, dayjs()),
    createData(30, "http://localhost:3000", 304, dayjs()),
    createData(41, "http://localhost:3000", 307, dayjs()),
    createData(42, "http://localhost:3000", 201, dayjs()),
    createData(43, "http://localhost:3000", 204, dayjs()),
    createData(44, "http://localhost:3000", 305, dayjs()),
    createData(45, "http://localhost:3000", 501, dayjs()),
    createData(46, "http://localhost:3000", 303, dayjs()),
    createData(47, "http://localhost:3000", 404, dayjs()),
    createData(48, "http://localhost:3000", 500, dayjs()),
    createData(49, "http://localhost:3000", 201, dayjs()),
    createData(50, "http://localhost:3000", 304, dayjs()),
    createData(51, "http://localhost:3000", 307, dayjs()),
    createData(52, "http://localhost:3000", 201, dayjs()),
    createData(53, "http://localhost:3000", 204, dayjs()),
    createData(54, "http://localhost:3000", 305, dayjs()),
    createData(55, "http://localhost:3000", 501, dayjs()),
    createData(56, "http://localhost:3000", 303, dayjs()),
    createData(57, "http://localhost:3000", 404, dayjs()),
    createData(58, "http://localhost:3000", 500, dayjs()),
    createData(59, "http://localhost:3000", 201, dayjs()),
    createData(60, "http://localhost:3000", 304, dayjs()),
    createData(61, "http://localhost:3000", 307, dayjs()),
    createData(62, "http://localhost:3000", 201, dayjs()),
    createData(63, "http://localhost:3000", 204, dayjs()),
    createData(64, "http://localhost:3000", 305, dayjs()),
    createData(65, "http://localhost:3000", 501, dayjs()),
    createData(66, "http://localhost:3000", 303, dayjs()),
    createData(67, "http://localhost:3000", 404, dayjs()),
    createData(68, "http://localhost:3000", 500, dayjs()),
    createData(69, "http://localhost:3000", 201, dayjs()),
    createData(70, "http://localhost:3000", 304, dayjs()),
    createData(71, "http://localhost:3000", 307, dayjs()),
    createData(72, "http://localhost:3000", 201, dayjs()),
    createData(73, "http://localhost:3000", 204, dayjs()),
    createData(74, "http://localhost:3000", 305, dayjs()),
    createData(75, "http://localhost:3000", 501, dayjs()),
    createData(76, "http://localhost:3000", 303, dayjs()),
    createData(77, "http://localhost:3000", 404, dayjs()),
    createData(78, "http://localhost:3000", 500, dayjs()),
    createData(79, "http://localhost:3000", 201, dayjs()),
    createData(80, "http://localhost:3000", 304, dayjs()),
    createData(81, "http://localhost:3000", 307, dayjs()),
    createData(82, "http://localhost:3000", 201, dayjs()),
    createData(83, "http://localhost:3000", 204, dayjs()),
    createData(84, "http://localhost:3000", 305, dayjs()),
    createData(85, "http://localhost:3000", 501, dayjs()),
    createData(86, "http://localhost:3000", 303, dayjs()),
    createData(87, "http://localhost:3000", 404, dayjs()),
    createData(88, "http://localhost:3000", 500, dayjs()),
    createData(89, "http://localhost:3000", 201, dayjs()),
    createData(90, "http://localhost:3000", 304, dayjs()),
    createData(91, "http://localhost:3000", 307, dayjs()),
    createData(92, "http://localhost:3000", 201, dayjs()),
    createData(93, "http://localhost:3000", 204, dayjs()),
    createData(94, "http://localhost:3000", 305, dayjs()),
    createData(95, "http://localhost:3000", 501, dayjs()),
    createData(96, "http://localhost:3000", 303, dayjs()),
    createData(97, "http://localhost:3000", 404, dayjs()),
    createData(98, "http://localhost:3000", 500, dayjs()),
    createData(99, "http://localhost:3000", 201, dayjs()),
    createData(100, "http://localhost:3000", 304, dayjs()),
    createData(101, "http://localhost:3000", 307, dayjs()),
    createData(102, "http://localhost:3000", 201, dayjs()),
    createData(103, "http://localhost:3000", 204, dayjs()),
    createData(104, "http://localhost:3000", 305, dayjs()),
    createData(105, "http://localhost:3000", 501, dayjs()),
    createData(106, "http://localhost:3000", 303, dayjs()),
    createData(107, "http://localhost:3000", 404, dayjs()),
    createData(108, "http://localhost:3000", 500, dayjs()),
    createData(109, "http://localhost:3000", 201, dayjs()),
    createData(110, "http://localhost:3000", 304, dayjs()),
    createData(111, "http://localhost:3000", 307, dayjs()),
    createData(112, "http://localhost:3000", 201, dayjs()),
    createData(113, "http://localhost:3000", 204, dayjs()),
    createData(114, "http://localhost:3000", 305, dayjs()),
    createData(115, "http://localhost:3000", 501, dayjs()),
    createData(116, "http://localhost:3000", 303, dayjs()),
    createData(117, "http://localhost:3000", 404, dayjs()),
    createData(118, "http://localhost:3000", 500, dayjs()),
    createData(119, "http://localhost:3000", 201, dayjs()),
    createData(120, "http://localhost:3000", 304, dayjs()),
  ];
  
  return {
    page: filter.page,
    pageSize: filter.pageSize,
    totalElements: items.length,
    items: items.slice((filter.page - 1) * filter.pageSize, filter.page * filter.pageSize),
}};


interface StatusCodeCounter {
  x200: number;
  x300: number;
  x400: number;
  x500: number;
}


function getChipForStatusCode (statusCode: number): JSX.Element {
  var colorForStatusCode: "success" | "warning" | "error";

  if (statusCode < 300) {
    colorForStatusCode = "success";
  } else if (statusCode < 500) {
    colorForStatusCode = "error";
  } else {
    colorForStatusCode = "warning";
  }

  return (
    <ThemeProvider theme={MyTheme}>
      <Chip className="w-full" label={statusCode} size="medium" color={colorForStatusCode} />
    </ThemeProvider>
  )
}

function countStatusCode(items: StatisticInterface[]): StatusCodeCounter {
  const counter: StatusCodeCounter = {
    x200: 0,
    x300: 0,
    x400: 0,
    x500: 0,
  }

  for (const item of items) {
    if (item.statusCode >= 200 && item.statusCode < 300) {
      counter.x200 += 1;
    } else if (item.statusCode >= 300 && item.statusCode < 400) {
      counter.x300 += 1;
    } else if (item.statusCode >= 400 && item.statusCode < 500) {
      counter.x400 += 1;
    } else if (item.statusCode >= 500 && item.statusCode < 600) {
      counter.x500 += 1;
    }
  }

  return counter;
}


export default function StatisticsPage() {
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState<StatisticInterface[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [statusCodeBars, setStatusCodeBars] = useState<StatusCodeCounter>();

  const handleChangePage = (_: unknown, newPage: number) => {
    setCurrentPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const getStatstics = () => {
    const statisticsResponse = fetchStatstics({
      page: currentPage,
      pageSize: rowsPerPage,
    });
    setStatistics(statisticsResponse.items);
    setTotalElements(statisticsResponse.totalElements);
    setCurrentPage(statisticsResponse.page);
    setStatusCodeBars(countStatusCode(statisticsResponse.items));
  };

  useEffect(() => {
    if (!AuthService.isAdmin()) {
      navigate("/");
    }

    getStatstics();
  }, [currentPage, rowsPerPage]);

  return (
    <div
      className="p-10 mt-5 w-5/6 bg-my-third-color drop-shadow-2xl rounded-md"
    >
      <Text size="large" className="mb-5">Статистика</Text>

      <BarChart
        series={[
          { data: [statusCodeBars?.x200 as number], label: "2XX", color: "#008000", id: "2XXid" },
          { data: [statusCodeBars?.x300 as number], label: "3XX", color: "#DAA520", id: "3XXid" },
          { data: [statusCodeBars?.x400 as number], label: "4XX", color: "#FF0000", id: "4XXid"},
          { data: [statusCodeBars?.x500 as number], label: "5XX", color: "#8B0000", id: "5XXid" },
        ]}
        height={290}
        xAxis={[{ data: ["Статусы возврата"], scaleType: 'band', }]}
        margin={{ top: 50, bottom: 50, left: 30, right: 10 }}
      />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell sx = {{backgroundColor: "var(--my-primary-color)", color: "var(--my-third-color)"}}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Text size="medium">{column.label}</Text>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {statistics
                .map((statistic) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={statistic.id}>
                      {columns.map((column) => {
                        const value = statistic[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "id" && <Text size="little">{value}</Text>}
                            {column.id === "url" && <Text size="little" className="font-extrabold">{value}</Text>}
                            {column.id === "statusCode" && getChipForStatusCode(value as number)}
                            {column.id === "time" && <Text size="little" className="italic">{value}</Text>}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50, 100, 200]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={currentPage-1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Строк на странице"}
        />
      </Paper>
    </div>
  )
}
