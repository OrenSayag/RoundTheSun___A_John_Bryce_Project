const siteViewsIncrement = async (req, res, next) => {
  const ip = req.connection.remoteAddress;
  // if(ip==="my windows or phone"){
  if (ip == "::ffff:31.168.222.174" || ip == "::ffff:188.64.206.187") {
    console.log(
      "New connection from my windows or phone; views are not incremented"
    );
    return next();
  }

  console.log("New connection from ip " + req.connection.remoteAddress);

  // await ViewsModel.findByIdAndUpdate("60fac650aeda3fa0eab208b5", {
//   await ViewsModel.findByIdAndUpdate("60fac457a43ddd00001ac6a7", {
//     $inc: {
//       siteViews: 1,
//     },
//   }).catch((err) => {
//     console.log(err);
//   });

  next();
};

module.exports = {
    siteViewsIncrement
}