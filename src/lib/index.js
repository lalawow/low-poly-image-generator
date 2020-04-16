import {
  isArray,
  isObjectLike,
  isPlainObject,
  map,
  transform,
  set,
  camelCase,
  get,
} from "lodash";
import moment from "moment";
import history from "./history";
import localStorageActions from "./localStorageActions"

/**
 * add rounding function to Number class
 * @param {Number} number 需要定义精度的数
 * @param {Number} precision 精度，例如 0.1
 */
export function round(number, precision) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(number * multiplier) / multiplier;
}

/**
 * A delay promise
 * @param {Number} ms delay miliseconds
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Format time
 * @param {Date} date
 */
const formatDate = (date, format) =>
  date ? moment(date).format(format) : "--";
export const ymdhms = date => formatDate(date, "YYYY-MM-DD HH:mm:ss");
export const ymdhm = date => formatDate(date, "YYYY-MM-DD HH:mm");
export const ymd = date => formatDate(date, "YYYY-MM-DD");
export const hms = date => formatDate(date, "HH:mm:ss");

export const sliceVal = val => val.slice(-10);
/**
 * Combine date and time
 * @param {Date} date
 * @param {Date} time
 */
export function combine(date, time) {
  const m = moment(date);
  m.hour(time.hour());
  m.minute(time.minute());
  m.second(time.second());
  return m;
}

function createIteratee(converter, self) {
  return (result, value, key) =>
    set(result, converter(key), isObjectLike(value) ? self(value) : value);
}

function createHumps(keyConverter) {
  return function humps(node) {
    if (isArray(node)) return map(node, humps);
    if (isPlainObject(node))
      return transform(node, createIteratee(keyConverter, humps));
    return node;
  };
}

/**
 * Make object keys camelcase
 */
export const humps = createHumps(camelCase);

/**
 * try to parse json string
 * if error log it
 *
 * @param {string} jsonStr string tobe parsed
 */
export function tryParseJson(jsonStr) {
  let result;
  try {
    if (jsonStr) result = JSON.parse(jsonStr);
  } catch (err) {
    console.error(err);
  } finally {
    return result;
  }
}

export const formatValue = (record, key, render) => {
  const data = get(record, key);
  if (data) {
    if (render) {
      if (typeof render === "function") return render(data);
      return render[data];
    }
    return data;
  }
  return "--";
};

export const getUser = ({ session }) => {
  return get(session, "result.user");
};

const getSessionResult = ({ session }) => {
  const result = session.result;
  return result.user ? result : { user: {} };
};

export const getUserId = ({ session }) => {
  const { user } = getSessionResult({ session });
  return user.id;
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


export { history };
export { localStorageActions };
