
Having studied deterministic finite automata in the previous experiment, we propose to study a generalization of DFAs – nondeterministic finite automaton (NFA). In a DFA, the next state in its run is completely determined by its current state and the transition function. Further, in a DFA there is exactly one transition from a given state for each input symbol. In an NFA, this need not be the case. At a given state, there could be zero, one, or more than one transitions possible for a given input symbol. Through this experiment, we wish to gently introduce the notion of non-determinism to the students. This is akin to reaching a crossroads (without the knowledge of what lies ahead) and non-deterministically choosing a path from those available, and backtracking later in case of a failure.


A non-deterministic finite automaton (NFA) is an abstraction of a constant memory machine with transitions that need not be unique. An NFA either accepts or rejects a string by running through a sequence of states that are non-deterministically chosen upon reading the sequence of symbols in the given string. A language of an NFA is the set of all strings that are accepted by it.

