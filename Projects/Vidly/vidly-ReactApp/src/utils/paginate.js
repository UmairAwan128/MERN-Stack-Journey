import _ from "lodash";
//we created a method here for reusability this method will paginate the data
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //to take array from startIndex till end use
  //_.slice(items, startIndex);
  //then use take method on the array and get elements according to pageSize
  //_.take(items,pageSize)
  //but a better way is to chain all these methods in one line for that first
  //convert this array to lodash wrapper as _(array)
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
  //then at the end .value() will unwrap the array and we get the array back
}
