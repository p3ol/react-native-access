package tech.poool.rnaccess

class EventEmitter {
  private val events: MutableMap<
    String,
    MutableList<Pair<Boolean, (Any?) -> Any?>>
    > = mutableMapOf()

  fun <T: Any?> on (event: String, listener: (T) -> Any?) {
    if (!events.containsKey(event)) {
      events[event] = mutableListOf()
    }

    events[event]?.add(Pair(false, listener as (Any?) -> Any?))

    return
  }

  fun <T: Any?> once (event: String, listener: (T) -> Any?) {
    if (!events.containsKey(event)) {
      events[event] = mutableListOf()
    }

    events[event]?.add(Pair(true, listener as (Any?) -> Any?))

    return
  }

  fun emit (event: String, data: Any?) {
    if (!events.containsKey(event)) {
      return
    }

    val results = mutableListOf<Any?>()

    events[event]?.forEachIndexed { index, it ->
      val (once, callback) = it

      try {
        results.add(callback(data))
      } catch (e: Exception) {
        e.printStackTrace()
      }

      if (once) {
        events[event]?.removeAt(index)
      }
    }
  }

  fun <T: Any?> off (event: String, listener: (T) -> Any?) {
    if (!events.containsKey(event)) {
      return
    }

    events[event]?.removeIf { it.second == listener }
  }
}
