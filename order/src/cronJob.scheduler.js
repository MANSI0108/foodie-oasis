
const { CronJob } = require("cron")
const { client } = require("../helper")



const cartEmptyFunction = async () => {

      const keys = await client.keys("user*")
      for (const key of keys) { 
            const cart = JSON.parse(await client.get(key))
            console.log(cart);

            const old = (cart[1].updated_by) / (3600000)
            const New = (Date.now()) / 3600000
            const diff = New - old;

            if (diff > 1) {
                  await client.del((key))
            }
      }

}

const Job = new CronJob(process.env.CART_SCHEDULER_CRONTIME, cartEmptyFunction, null, false)

module.exports = Job


 







