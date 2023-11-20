import React from 'react'

async function takeTime(){
    await new Promise( (resolve) => {
        throw new Error(`this is manual error`)
        setTimeout(resolve,3000)
    })
}
const AboutPage = async () => {
    await takeTime();
  return (
    <div>AboutPage</div>
  )
}

export default AboutPage