let respondentInfoKeys = {
  name: "Name",
  gender: "Gender",
  email: "Email",
  dob: "Date Of Birth",
  phoneNumber: "Phone Number",
};

export const getHeaders = (response) => {
  let headers = [];
  headers.push({ header: "ID", key: "_id", width: 30 });
  response.respondentInfo.map((resp) => {
    headers.push({
      header: respondentInfoKeys[resp.info],
      key: resp.info,
      width: 30,
    });
  });
  response.answers.map((ans) => {
    headers.push({
      header: ans.questionTitle,
      key: ans.questionTitle,
      width: 30,
    });
  });
  return headers;
};

export const getRows = (responses) => {
  let rows = [];
  rows = responses.map((response) => {
    let row = {};
    row._id = response._id;
    response.respondentInfo.map((resp) => {
      row[resp.info] = resp.value;
    });
    response.answers.map((ans) => {
      row[ans.questionTitle] = ans.answer.toString();
    });
    return row;
  });
  return rows;
};

export const getDate = () => {
  let today = new Date().toISOString();
  return today.substring(0, 10);
};
