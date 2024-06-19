class APIFeatures {
    constructor(query, queryString, excludedFields) {
      this.query = query;
      this.queryString = queryString;
      this.sortPopulated = false
      this.excludedFields = ["page", "sort", "limit", "fields", "sortPopulated"]
      Array.prototype.push.apply(this.excludedFields, excludedFields);
    }
  
    filter() {
      const queryObj = { ...this.queryString };
      this.excludedFields.forEach(el => delete queryObj[el]);
  
      // 1B) Advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join(" ");
        this.query = this.query.sort(sortBy);
      }
      else if (this.queryString.sortPopulated) {
        this.sortPopulated = true;
        this.query = this.query.sort("-createdAt");
      }
      else {
        this.query = this.query.sort("-createdAt");
      }
  
      return this;
    }

  // Method to sort by populated fields specified in the query string
  async execWithPopulatedSort(order = 'asc') {
    let results = await this.query;

    if (this.sortPopulated){
      // Extract the field from queryString
      const field = this.queryString.sortPopulated;

      // Ensure there's a field to sort by
      if (!field) return await this.query;

      results = results.sort((a, b) => {
        // Extract nested field values if necessary
        const valueA = field.split('.').reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : undefined, a);
        const valueB = field.split('.').reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : undefined, b);

        if (!valueA || !valueB) return 0;
        if (order === 'asc') return valueA < valueB ? -1 : 1;
        return valueA > valueB ? -1 : 1;
      });
    }

    return results;
  }

  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(",").join(" ");
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select("-__v");
      }
  
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }
  
  export default APIFeatures;