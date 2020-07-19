const conditions = [
  { _id: 1, name: "item1" },
  { _id: 2, name: "item2" },
  { _id: 3, name: "item3" },
];
const credentials = [
  { _id: 1, name: "item1" },
  { _id: 2, name: "item2" },
  { _id: 3, name: "item3" },
];
const operators = [
  { _id: 1, name: "item1" },
  { _id: 2, name: "item2" },
  { _id: 3, name: "item3" },
];
export default function getConditions() {
  return conditions;
}
export function getCredentials() {
  return credentials;
}
export function getOperators() {
  return operators;
}
