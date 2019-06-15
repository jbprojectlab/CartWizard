const Stopwatch = () => {
  let startTime, endTime, running, duration = 0

  this.start = () => {
    if(running) throw new Error('Stopwatch has already started.')
    running = true
    startTime = new Date()
  }

  this.stop = () => {
    if(!running) throw new Error('Stopwatch has not started.')
    running = false
    endTime = new Date()
    const seconds = (endTime.getTime() - startTime.getTime()) / 1000
    duration += seconds
  }

  this.reset = () {
    startTime = 0
    endTime = 0
    running = 0
    duration = 0
  }

  Object.defineProperty(this, 'duration', {
    get: function() {
      return duration
    }
  })
}