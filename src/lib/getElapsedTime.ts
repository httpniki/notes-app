export function getElapsedTime(date: Date) {
   const todayDateInMiliseconds = new Date().getTime()
   const argumentDateInMiliseconds = date.getTime()

   const seconds = Math.floor((todayDateInMiliseconds - argumentDateInMiliseconds) / 1000)
   const minutes = Math.floor(seconds / 60)
   const hours = Math.floor(minutes / 60)
   const days = Math.floor(hours / 24)
   
   return {
      seconds,
      minutes,
      hours,
      days
   }
}
