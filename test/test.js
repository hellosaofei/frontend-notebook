try {
  await rm("./1.txt");
  console.log("文件已经被删除");
} catch (err) {
  console.error("删除文件时发生错误", err);
}
// const p=new Promise.race()
