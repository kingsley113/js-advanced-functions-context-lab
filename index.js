/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function createEmployeeRecord(employeeInfo) {
  return {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeRecords) {
  return employeeRecords.map(createEmployeeRecord);
}

function createTimeInEvent(timestamp) {
  this.timeInEvents.push(createEvent.call(timestamp, "TimeIn"));
  return this;
}

function createTimeOutEvent(timestamp) {
  this.timeOutEvents.push(createEvent.call(timestamp, "TimeOut"));
  return this;
}

function createEvent(eventType) {
  const [date, hour] = this.split(" ");
  return {
    type: eventType,
    date: date,
    hour: parseInt(hour, 10),
  };
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(
    (timeInEvent) => timeInEvent.date === date
  ).hour;
  const timeOut = this.timeOutEvents.find(
    (timeOutEvent) => timeOutEvent.date === date
  ).hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function calculatePayroll(employeeRecords) {
  const payroll = employeeRecords.reduce(
    (memo, employee) => memo + allWagesFor.call(employee),
    0
  );
  return payroll;
}

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find((employee) => employee.firstName === firstName);
}
