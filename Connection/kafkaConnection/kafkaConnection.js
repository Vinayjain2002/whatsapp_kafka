const { Kafka, HighLevelProducer } = require('kafka-node'); // Destructure correctly from kafka-node

function ConnectionProvider() {

    // Method to get Kafka Consumer
    this.getConsumer = function (topic_name) {
        // Create Kafka client that connects to Zookeeper on port 2181
        this.client = new kafka.Client("localhost:2181");

        // Create a Kafka Consumer instance
        this.kafkaConsumerConnection = new kafka.Consumer(
            this.client,
            [{ topic: topic_name, partition: 0 }],
            {
                autoCommit: true,  // Enable auto commit of messages after consumption
            }
        );

        // Log when the client is ready
        this.client.on("ready", function () {
            console.log("Client ready for topic: " + topic_name);
        });

        // Return the consumer connection
        return this.kafkaConsumerConnection;
    };

    // Method to get Kafka Producer
    this.getProducer = function () {
        if (!this.kafkaProducerConnection) {
            // Create Kafka client that connects to Kafka broker
            this.client = new kafka.Client("localhost:2181");

            // Create a new producer
            this.kafkaProducerConnection = new HighLevelProducer(this.client);

            // Log when the producer is ready
            console.log("Producer is ready");
        }

        // Return the producer connection
        return this.kafkaProducerConnection;
    };
}

// Export the connection provider
module.exports = new ConnectionProvider();