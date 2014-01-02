package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.node.Node;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.FilterBuilders.*;
import org.elasticsearch.index.query.QueryBuilders.*;

import static org.elasticsearch.node.NodeBuilder.*;

public class GetInfo extends HttpServlet {
	private static final long serialVersionUID = 6421546789292351873L;

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// Node node =
		// nodeBuilder().clusterName("elasticsearch").client(true).node();
		// Client client = node.client();
		Client client = new TransportClient()
				.addTransportAddress(new InetSocketTransportAddress(
						"jose96043-ThinkPad-T420", 9300));
		SearchResponse esResponse = client
				.prepareSearch("companies")
				.setSize(10000)
				.setTypes("info")
				.setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
				.setQuery(QueryBuilders.matchAllQuery())
				.execute().actionGet();
		// GetResponse esResponse = client.prepareGet("companies", "info", "*")
		// .execute()
		// .actionGet();

		System.out.println(esResponse);
		client.close();
		
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		out.print(esResponse.toString());
		out.flush();
		out.close();
	}
}
