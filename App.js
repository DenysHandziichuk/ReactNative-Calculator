import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

const Button = ({ label, onPress, type = 'number', wide }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      styles[type],
      wide && styles.wide,
      pressed && { opacity: 0.6 },
    ]}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </Pressable>
);

export default function App() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [operator, setOperator] = useState(null);

  const inputNumber = (num) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const clear = () => {
    setDisplay('0');
    setPrev(null);
    setOperator(null);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const percent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const setOp = (op) => {
    setPrev(parseFloat(display));
    setOperator(op);
    setDisplay('0');
  };

  const calculate = () => {
    if (prev === null || operator === null) return;

    const curr = parseFloat(display);
    let result = 0;

    switch (operator) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '×': result = prev * curr; break;
      case '÷': result = curr === 0 ? 0 : prev / curr; break;
    }

    setDisplay(String(result));
    setPrev(null);
    setOperator(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display}</Text>

      <View style={styles.row}>
        <Button label="AC" type="func" onPress={clear} />
        <Button label="±" type="func" onPress={toggleSign} />
        <Button label="%" type="func" onPress={percent} />
        <Button label="÷" type="op" onPress={() => setOp('÷')} />
      </View>

      <View style={styles.row}>
        <Button label="7" onPress={() => inputNumber('7')} />
        <Button label="8" onPress={() => inputNumber('8')} />
        <Button label="9" onPress={() => inputNumber('9')} />
        <Button label="×" type="op" onPress={() => setOp('×')} />
      </View>

      <View style={styles.row}>
        <Button label="4" onPress={() => inputNumber('4')} />
        <Button label="5" onPress={() => inputNumber('5')} />
        <Button label="6" onPress={() => inputNumber('6')} />
        <Button label="-" type="op" onPress={() => setOp('-')} />
      </View>

      <View style={styles.row}>
        <Button label="1" onPress={() => inputNumber('1')} />
        <Button label="2" onPress={() => inputNumber('2')} />
        <Button label="3" onPress={() => inputNumber('3')} />
        <Button label="+" type="op" onPress={() => setOp('+')} />
      </View>

      <View style={styles.row}>
        <Button label="0" wide onPress={() => inputNumber('0')} />
        <Button label="." onPress={() => inputNumber('.')} />
        <Button label="=" type="op" onPress={calculate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  display: {
    color: 'white',
    fontSize: 64,
    textAlign: 'right',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  wide: {
    width: 170,
    alignItems: 'flex-start',
    paddingLeft: 28,
  },
  number: {
    backgroundColor: '#333',
  },
  op: {
    backgroundColor: '#ff9500',
  },
  func: {
    backgroundColor: '#a5a5a5',
  },
  buttonText: {
    color: 'white',
    fontSize: 32,
  },
});
