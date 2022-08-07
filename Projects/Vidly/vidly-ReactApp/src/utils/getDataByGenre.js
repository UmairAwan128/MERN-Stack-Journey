import _ from "lodash";
//my implementaion for filtering not used
//we created a method here for reusability this method will paginate the data
export function getByGenre(items, element) {
  return _(items)
    .filter({ genre: element })
    .value();
}
