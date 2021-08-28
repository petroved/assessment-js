/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (props, arr) => {
  if (!Array.isArray(arr) || arr.length < 1) {
    return [];
  }
  const result = [...arr];

  if (!Array.isArray(props) || props.length < 1) {
    return result;
  }

  result.map((item) => {
    props.forEach((prop) => {
      delete item[prop];
    })
  });

  return result;
};
exports.excludeByProperty = (prop, arr) => {
  if (!Array.isArray(arr) || arr.length < 1) {
    return [];
  }

  let result = [...arr];

  if (!prop || typeof prop !== 'string') {
    return result;
  }

  result = arr.filter((item) => {
    if (item.hasOwnProperty(prop)) {
      return false;
    }

    return true;
  });

  return result;
};
exports.sumDeep = (arr) => {
  if (!Array.isArray(arr) || arr.length < 1) {
    return [];
  }
  const result = [];

  arr.map((item) => {
    const resItem = {};
    for(let prop in item) {
      if (item.hasOwnProperty(prop)) {
        resItem[prop] = item[prop].reduce((accumulator, current) => {
          accumulator += current.val;

          return accumulator;
        }, 0)
      }
    }

    result.push(resItem);
  });

  return result;
};
exports.applyStatusColor = (colors, statuses) => {
  if (!Array.isArray(statuses) || statuses.length < 1) {
    return [];
  }


  if (typeof colors !== 'object' || colors === null || Array.isArray(colors)) {
    return [...statuses];
  }
  const result = [];

  statuses.forEach((item) => {
    let foundColor = false;
    let resItem = {...item};
    for(let prop in colors) {
      if (colors.hasOwnProperty(prop) && colors[prop].indexOf(item.status) > -1) {
        resItem.color = prop;
        foundColor = true;
        break;
      }
    }

    if (foundColor) {
      result.push(resItem);
    }
  });

  return result;
};
exports.createGreeting = (cb, greeting) => {
  return (name) => {
    if (typeof cb !== 'function') {
      return (greeting, name) => `${greeting} ${name}`
    }
    return cb(greeting, name);
  }
};
exports.setDefaults = (defaults) => {
  return (obj) => {
    if (typeof defaults !== 'object' || defaults === null || Array.isArray(defaults)) {
      return obj;
    }
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      return obj;
    }
    for (let prop in defaults) {
      if (defaults.hasOwnProperty(prop) && !(prop in obj)) {
        obj[prop] = defaults[prop];
      }
    }

    return obj;
  }
};
exports.fetchUserByNameAndUsersCompany = (userName, services) => {
  const result = {};

  let fetchUsers = services.fetchUsers()
    .then((users) => {
      return users.find((user) => user.name === userName);
    })
    .then((user) => {
      if (typeof user === 'object' && user !== null && user.companyId > 0) {
        result.user = user;
        return services.fetchCompanyById(user.companyId);
      }
    })
    .then((company) => {
      if (typeof company === 'object' && company !== null) {
        result.company = company;
      }
    });


  let fetchStatus = services.fetchStatus()
    .then((status) => {
      result.status = status;
    });


  return Promise.all([fetchUsers, fetchStatus])
    .then(() => result);
};
